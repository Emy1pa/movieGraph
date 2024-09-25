import mongoose from "mongoose";
import Joi from "joi";

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 100,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 50,
      enum: ["ScreenType", "SeatType", "LightingMode"],
    },
    screenSize: {
      type: Number,
      required: true,
      min: 20,
      max: 150,
    },
    numberOfPlaces: {
      type: Number,
      required: true,
      min: 1,
    },
    rowsCount: {
      type: Number,
      required: true,
      min: 1,
    },
    seatsPerRow: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

export function validateRoom(room) {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required(),
    capacity: Joi.number().integer().min(1).required(),
    type: Joi.string()
      .trim()
      .min(1)
      .max(50)
      .valid("ScreenType", "SeatType", "LightingMode")
      .required(),
    screenSize: Joi.number().integer().min(20).max(150).required(),
    numberOfPlaces: Joi.number().integer().min(1).required(),
    rowsCount: Joi.number().integer().min(1).required(),
    seatsPerRow: Joi.number().integer().min(1).required(),
  });
  return schema.validate(room);
}

export function UpdateRoom(room) {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).max(100),
    capacity: Joi.number().integer().min(1),
    type: Joi.string()
      .trim()
      .min(1)
      .max(50)
      .valid("ScreenType", "SeatType", "LightingMode"),
    screenSize: Joi.number().integer().min(20).max(150),
    numberOfPlaces: Joi.number().integer().min(1),
    rowsCount: Joi.number().integer().min(1),
    seatsPerRow: Joi.number().integer().min(1),
  });
  return schema.validate(room);
}

const Room = mongoose.model("Room", RoomSchema);
export default Room;
