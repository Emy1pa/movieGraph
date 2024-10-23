const mongoose = require("mongoose");
const Joi = require("joi");

const RateSchema = new mongoose.Schema(
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
    ratingValue: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

function validateRating(rate) {
  const schema = Joi.object({
    user: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    movie: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    ratingValue: Joi.number().min(0).max(10).required(),
  });
  return schema.validate(rate);
}

function validateUpdateRate(rate) {
  const schema = Joi.object({
    ratingValue: Joi.number().min(0).max(10),
  });
  return schema.validate(rate);
}

const Rate = mongoose.model("Rate", RateSchema);

module.exports = {
  Rate,
  validateRating,
  validateUpdateRate,
};
