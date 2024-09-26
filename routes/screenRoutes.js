const express = require("express");
const {
  createScreening,
  getScreenings,
  getScreeningById,
  updateScreening,
  deleteScreening,
  getAvailableScreenings,
} = require("../controllers/screenController");

const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/auth");

const router = express.Router();

router.post("/", verifyTokenAndAdmin, createScreening);

router.get("/", getScreenings);

router.get("/:id", verifyTokenAndAdmin, getScreeningById);

router.put("/:id", verifyTokenAndAdmin, updateScreening);

router.delete("/:id", verifyTokenAndAdmin, deleteScreening);

router.get("/movie/:movieId", getAvailableScreenings);

module.exports = router;
