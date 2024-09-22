import User, { validateChangePassword } from "../models/User.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export function getForgotPasswordView(req, res) {
  res.render("forgot-password");
}
export async function sendForgotPasswordLink(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "1h",
  });
  const link = `http://localhost:8800/password/reset-password/${user._id}/${token}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: "Reset Password",
    html: `<div>
    <h4>Click On the link below to reset your password</h4>
    <p>${link}</p>
    </div>`,
  };
  transporter.sendMail(mailOptions, function (error, success) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    } else {
      console.log("Email sent successfully" + success.response);
      res.render("link-send");
    }
  });
}
export async function getResetPasswordView(req, res) {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", {
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function resetThePassword(req, res) {
  const { error } = validateChangePassword(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();
    res.render("success-password");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }

  const link = `http://localhost:8800/password/reset-password/${user._id}/${token}`;
  res.json({ message: "Click on the link", resetPasswordLink: link });
}
