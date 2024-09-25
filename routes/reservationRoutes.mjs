import express from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationController.mjs";
import { verifyToken, verifyTokenAndAdmin } from "../middlewares/auth.mjs";

const router = express.Router();

router.post("/", verifyToken, createReservation);

router.get("/", verifyTokenAndAdmin, getReservations);

router.get("/:id", verifyTokenAndAdmin, getReservationById);

router.put("/:id", verifyTokenAndAdmin, updateReservation);

router.delete("/:id", verifyTokenAndAdmin, deleteReservation);

export default router;
