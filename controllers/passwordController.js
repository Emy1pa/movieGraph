const { User, validateChangePassword } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

function getForgotPasswordView(req, res) {
  res.render("forgot-password");
}

async function sendForgotPasswordLink(req, res) {
  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "3d",
  });
  const link = `${FRONTEND_URL}/password/reset-password/${user._id}/${token}`;
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

async function getResetPasswordView(req, res) {
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

async function resetThePassword(req, res) {
  try {
    const { error } = validateChangePassword(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;
    try {
      jwt.verify(req.params.token, secret);
    } catch (tokenError) {
      console.error("Token verification failed:", tokenError);
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetThePassword:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
async function verifyResetToken(req, res) {
  const { userId, token } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(token, secret);
    res.json({ message: "Token is valid", email: user.email });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetThePassword,
  verifyResetToken,
};
