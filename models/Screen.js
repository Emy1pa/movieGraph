const mongoose = require("mongoose");
const Joi = require("joi");

const ScreeningSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

function validateScreening(screening) {
  const schema = Joi.object({
    movie: Joi.string().required(),
    room: Joi.string().required(),
    dateTime: Joi.date().iso().required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(screening);
}

function validateUpdateScreening(screening) {
  const schema = Joi.object({
    movie: Joi.string(),
    room: Joi.string(),
    dateTime: Joi.date().iso(),
    price: Joi.number().min(0),
  });
  return schema.validate(screening);
}

const Screening = mongoose.model("Screening", ScreeningSchema);

module.exports = {
  Screening,
  validateScreening,
  validateUpdateScreening,
};
