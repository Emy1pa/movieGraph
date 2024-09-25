import mongoose from "mongoose";
import Joi from "joi";

const ReservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    screening: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screening",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    seats: [
      {
        row: {
          type: Number,
          required: true,
          min: 1,
        },
        column: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);
export function validateReservation(reservation) {
  const schema = Joi.object({
    user: Joi.string().required(),
    screening: Joi.string().required(),
    room: Joi.string().required(),
    seats: Joi.array()
      .items(
        Joi.object({
          row: Joi.number().integer().min(1).required(),
          column: Joi.number().integer().min(1).required(),
        })
      )
      .min(1)
      .required(),
    totalPrice: Joi.number().min(0).required(),
  });
  return schema.validate(reservation);
}

export function validateUpdateReservation(reservation) {
  const schema = Joi.object({
    seats: Joi.array()
      .items(
        Joi.object({
          row: Joi.number().integer().min(1),
          column: Joi.number().integer().min(1),
        })
      )
      .min(1),
    totalPrice: Joi.number().min(0),
  });
  return schema.validate(reservation);
}

const Reservation = mongoose.model("Reservation", ReservationSchema);
export default Reservation;
