const express = require("express");
const {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");

const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/", verifyToken, createReservation);

router.get("/", verifyTokenAndAdmin, getReservations);

router.get("/:id", verifyTokenAndAdmin, getReservationById);

router.put("/:id", verifyTokenAndAdmin, updateReservation);

router.delete("/:id", verifyTokenAndAdmin, deleteReservation);

module.exports = router;
