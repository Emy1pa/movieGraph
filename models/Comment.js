const mongoose = require("mongoose");
const Joi = require("joi");

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  }
);

function validateComment(comment) {
  const schema = Joi.object({
    user: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    movie: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    content: Joi.string().min(5).max(100).required(),
  });
  return schema.validate(comment);
}

function validateUpdateComment(comment) {
  const schema = Joi.object({
    content: Joi.string().min(5).max(100),
  });
  return schema.validate(comment);
}

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {
  Comment,
  validateComment,
  validateUpdateComment,
};
