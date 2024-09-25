import express from "express";
import {
  createScreening,
  getScreenings,
  getScreeningById,
  updateScreening,
  deleteScreening,
  getAvailableScreenings,
} from "../controllers/screenController.mjs";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/auth.mjs";

const router = express.Router();

router.post("/", verifyTokenAndAdmin, createScreening);

router.get("/", getScreenings);

router.get("/:id", verifyTokenAndAdmin, getScreeningById);

router.put("/:id", verifyTokenAndAdmin, updateScreening);

router.delete("/:id", verifyTokenAndAdmin, deleteScreening);

router.get("/movie/:movieId", getAvailableScreenings);

export default router;
