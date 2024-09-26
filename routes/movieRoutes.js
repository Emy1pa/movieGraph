const express = require("express");
const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/MovieController");
const { verifyTokenAndAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/", verifyTokenAndAdmin, createMovie);

router.get("/", getMovies);

router.get("/:id", verifyTokenAndAdmin, getMovieById);

router.put("/:id", verifyTokenAndAdmin, updateMovie);

router.delete("/:id", verifyTokenAndAdmin, deleteMovie);

module.exports = router;
