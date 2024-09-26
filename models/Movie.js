const mongoose = require("mongoose");
const Joi = require("joi");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 200,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().trim().min(1).max(200).required(),
    duration: Joi.number().integer().min(1).required(),
    genre: Joi.string().trim().min(1).max(50).required(),
    description: Joi.string().trim().min(1).max(1000).required(),
  });
  return schema.validate(movie);
}

function validateUpdateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().trim().min(1).max(200),
    duration: Joi.number().integer().min(1),
    genre: Joi.string().trim().min(1).max(50),
    description: Joi.string().trim().min(1).max(1000),
  });
  return schema.validate(movie);
}

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = {
  Movie,
  validateMovie,
  validateUpdateMovie,
};
