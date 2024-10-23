const nodemailer = require("nodemailer");
const {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
} = require("../models/User");
const bcrypt = require("bcryptjs");
const path = require("path");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const fs = require("fs");
async function register(req, res) {
  try {
    const { error } = validateRegisterUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let image = {};
    if (req.file) {
      const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
      const result = await cloudinaryUploadImage(imagePath);
      image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
      fs.unlinkSync(imagePath);
    } else {
      image = {
        url: "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_1280.png",
        publicId: null,
      };
    }
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      image: image,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    });
    await user.save();

    const { password, ...other } = user._doc;
    res.status(201).json({ ...other });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function login(req, res) {
  try {
    const { error } = validateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    const { password, _id, ...other } = user._doc;
    res.status(200).json({ ...other, token, userId: _id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function updateUser(req, res) {
  try {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const cleanId = req.user.id.trim();

    const user = await User.findById(cleanId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let updatedFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    };
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(req.body.password, salt);
    }
    if (req.file) {
      const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
      const result = await cloudinaryUploadImage(imagePath);
      if (user.image && user.image.publicId) {
        await cloudinaryRemoveImage(user.image.publicId);
      }
      updatedFields.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
      fs.unlinkSync(imagePath);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function logOut(req, res) {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function getUsersCount(req, res) {
  const count = await User.count();
  res.status(200).json(count);
}

async function profilePhotoUpload(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  res.status(200).json({ message: "Your profile photo uploaded successfully" });
}

async function getUserInfo(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    console.log("User ID:", req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
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
      subject: "Your Information",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="background-color: #4a90e2; color: #ffffff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <svg style="width: 50px; height: 50px; margin-bottom: 10px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <h1 style="margin: 0; font-size: 24px;">Your Information</h1>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px; line-height: 1.5; color: #333; margin: 10px 0;">
              <strong>Name:</strong> ${user.firstName} ${user.lastName}
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #333; margin: 10px 0;">
              <strong>Email:</strong> ${user.email}
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #333; margin: 10px 0;">
              <strong>Phone:</strong> ${user.phoneNumber}
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #333; margin: 10px 0;">
              <strong>Address:</strong> ${user.address}
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #333; margin: 10px 0;">
              <strong>Role:</strong> ${user.role}
            </p>
          </div>
          <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 14px; color: #777; border-radius: 0 0 8px 8px;">
            Thank you for using our service!
          </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Your information was sent to your email." });
  } catch (error) {
    console.error("Error sending user information:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}
async function banUser(req, res) {
  try {
    const userId = req.params.id;
    const { accountStatus } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { accountStatus: accountStatus },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User has been banned successfully",
      user,
    });
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
  register,
  login,
  updateUser,
  getUsers,
  getUserById,
  deleteUser,
  logOut,
  getUserInfo,
  getUsersCount,
  profilePhotoUpload,
  banUser,
};
