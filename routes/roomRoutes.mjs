import express from "express";
import {
  createRoom,
  getRooms,
  getRoomById,
  updateTheRoom,
  deleteRoom,
} from "../controllers/roomController.mjs";
import { verifyTokenAndAdmin } from "../middlewares/auth.mjs";

const router = express.Router();

router.post("/", verifyTokenAndAdmin, createRoom);

router.get("/", verifyTokenAndAdmin, getRooms);

router.get("/:id", verifyTokenAndAdmin, getRoomById);

router.put("/:id", verifyTokenAndAdmin, updateTheRoom);

router.delete("/:id", verifyTokenAndAdmin, deleteRoom);

export default router;
