const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    image: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_1280.png",
        publicId: null,
      },
    },
    phoneNumber: {
      type: String,
      trim: true,
      minLength: 10,
      maxLength: 15,
    },
    address: {
      type: String,
      trim: true,
      maxLength: 200,
    },
    role: {
      type: String,
      enum: ["client", "admin", "subadmin"],
      default: "client",
    },
    accountStatus: {
      type: String,
      enum: ["active", "banned"],
      default: "active",
    },
    subscriptionType: {
      type: String,
      enum: ["basic", "subscribed"],
      default: "subscribed",
    },
  },
  {
    timestamps: true,
  }
);

function validateRegisterUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: passwordComplexity().required(),
    image: Joi.object({
      url: Joi.string().uri().required(),
      publicId: Joi.string().allow(null),
    }).optional(),
    phoneNumber: Joi.string().trim().min(10).max(15),
    address: Joi.string().trim().max(200),
  });
  return schema.validate(obj);
}

function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}

function validateChangePassword(obj) {
  const schema = Joi.object({
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}

function validateUpdateUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50),
    lastName: Joi.string().trim().min(2).max(50),
    email: Joi.string().trim().min(5).max(100).email(),
    password: passwordComplexity(),
    image: Joi.object({
      url: Joi.string().uri().required(),
      publicId: Joi.string().allow(null),
    }).optional(),
    phoneNumber: Joi.string().trim().min(10).max(15),
    address: Joi.string().trim().max(200),
  });
  return schema.validate(obj);
}

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateChangePassword,
  validateUpdateUser,
};
