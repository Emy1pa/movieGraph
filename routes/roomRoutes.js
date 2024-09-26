const express = require("express");
const {
  createRoom,
  getRooms,
  getRoomById,
  updateTheRoom,
  deleteRoom,
} = require("../controllers/roomController");

const { verifyTokenAndAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/", verifyTokenAndAdmin, createRoom);

router.get("/", verifyTokenAndAdmin, getRooms);

router.get("/:id", verifyTokenAndAdmin, getRoomById);

router.put("/:id", verifyTokenAndAdmin, updateTheRoom);

router.delete("/:id", verifyTokenAndAdmin, deleteRoom);

module.exports = router;
