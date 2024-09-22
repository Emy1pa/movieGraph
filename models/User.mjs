import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

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
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["client", "admin", "subadmin"],
      default: "client",
    },
  },
  {
    timestamps: true,
  }
);

export function validateRegisterUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(5).max(100).required(),
    lastName: Joi.string().trim().min(5).max(100).required(),
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}
export function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}
export function validateUpdateUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(5).max(100),
    lastName: Joi.string().trim().min(5).max(100),
    email: Joi.string().trim().min(5).max(100).email(),
    password: Joi.string().trim().min(6),
  });
  return schema.validate(obj);
}
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const User = mongoose.model("User", UserSchema);
export default User;
