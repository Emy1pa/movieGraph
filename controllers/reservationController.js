const { Room } = require("../models/Room");
const { Screen } = require("../models/Screen");
const { User } = require("../models/User");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const {
  Reservation,
  validateReservation,
  validateUpdateReservation,
} = require("../models/Reservation");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

console.log("Email:", process.env.EMAIL);
console.log("Email Password:", process.env.EMAIL_PASS ? "****" : "Not set");

async function sendEmail(to, subject, html) {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

async function createReservation(req, res) {
  try {
    const { error } = validateReservation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { user, screening, room, seats, totalPrice } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser)
      return res.status(404).json({ message: "User not found." });

    const existingScreening = await Screen.findById(screening);
    if (!existingScreening)
      return res.status(404).json({ message: "Screening not found." });

    const existingRoom = await Room.findById(room);
    if (!existingRoom)
      return res.status(404).json({ message: "Room not found." });

    const reservedSeats = await Reservation.find({ screening, room });
    const occupiedSeats = reservedSeats.flatMap((r) =>
      r.seats.map((s) => `${s.row}-${s.column}`)
    );
    const requestedSeats = seats.map((s) => `${s.row}-${s.column}`);
    const availableSeats = requestedSeats.filter(
      (s) => !occupiedSeats.includes(s)
    );
    if (availableSeats.length !== requestedSeats.length) {
      return res.status(400).json({
        message: "Some of the requested seats are not available.",
      });
    }

    const reservation = new Reservation({
      user,
      screening,
      room,
      seats,
      totalPrice,
    });
    await reservation.save();

    const reservationDetails = `
      <h1 style="text-align: center; color: #2c3e50;">Reservation Confirmation</h1>
      <p>Dear ${existingUser.firstName},</p>
      <p>Thank you for making a reservation with us! Here are your reservation details:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Screening</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${screening}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Room</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${room}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Seats</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${seats
            .map((seat) => `Row ${seat.row}, Seat ${seat.column}`)
            .join(", ")}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Total Price</td>
          <td style="border: 1px solid #ddd; padding: 8px;">$${totalPrice}</td>
        </tr>
      </table>
      <p style="margin-top: 20px;">We look forward to seeing you!</p>
      <p>Best regards,</p>
      <p><strong>Your Cinema Team</strong></p>
    `;

    await sendEmail(
      existingUser.email,
      "Your Reservation Confirmation",
      reservationDetails
    );

    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function getReservations(req, res) {
  try {
    console.log("hello");

    const reservations = await Reservation.find()
      .populate("user", "-password")
      .populate("screening")
      .populate("room");

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function getReservationById(req, res) {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("user")
      .populate("screening")
      .populate("room");
    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function updateReservation(req, res) {
  try {
    const { error } = validateUpdateReservation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { seats, totalPrice } = req.body;

    const reservedSeats = await Reservation.find({
      screening: req.body.screening,
      room: req.body.room,
      _id: { $ne: req.params.id },
    });
    const occupiedSeats = reservedSeats.flatMap((r) =>
      r.seats.map((s) => `${s.row}-${s.column}`)
    );

    const requestedSeats = seats.map((s) => `${s.row}-${s.column}`);
    const availableSeats = requestedSeats.filter(
      (s) => !occupiedSeats.includes(s)
    );

    if (availableSeats.length !== requestedSeats.length) {
      return res.status(400).json({
        message: "Some of the requested seats are not available",
      });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { seats, totalPrice },
      { new: true }
    )
      .populate("user")
      .populate("screening")
      .populate("room");

    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function deleteReservation(req, res) {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (reservation) {
      res
        .status(200)
        .json({ message: "Reservation has been deleted successfully" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function getUserReservations(req, res) {
  try {
    const userId = req.params.userId;

    const reservations = await Reservation.find({ user: userId })
      .populate("screening")
      .populate("room");

    if (!reservations || reservations.length === 0) {
      return res
        .status(404)
        .json({ message: "No reservations found for this user." });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getUserReservations,
};
