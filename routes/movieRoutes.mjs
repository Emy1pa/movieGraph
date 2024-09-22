import express from "express";
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/MovieController.mjs";
import { verifyTokenAndAdmin } from "../middlewares/auth.mjs";

const router = express.Router();

router.post("/", verifyTokenAndAdmin, createMovie);

router.get("/", getMovies);

router.get("/:id", verifyTokenAndAdmin, getMovieById);

router.put("/:id", verifyTokenAndAdmin, updateMovie);

router.delete("/:id", verifyTokenAndAdmin, deleteMovie);

export default router;
