const express = require("express");
const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/MovieController");
const { verifyTokenAndAdmin } = require("../middlewares/auth");
const photoUpload = require("../middlewares/photoUpload");

const router = express.Router();

router.post("/", verifyTokenAndAdmin, photoUpload.single("image"), createMovie);

router.get("/", getMovies);

router.get("/:id", verifyTokenAndAdmin, getMovieById);

router.put(
  "/:id",
  verifyTokenAndAdmin,
  photoUpload.single("image"),
  updateMovie
);

router.delete("/:id", verifyTokenAndAdmin, deleteMovie);

module.exports = router;
