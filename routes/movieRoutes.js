const express = require("express");
const router = express.Router();
const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/MovieController");
const { verifyTokenAndAdmin, verifyToken } = require("../middlewares/auth");
const upload = require("../middlewares/photoUpload");
const multer = require("multer"); // Make sure to import multer if it's not imported

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message:
          err.field === "image"
            ? "Image size should be less than 2MB"
            : "Video size should be less than 50MB",
      });
    }
    return res.status(400).json({ message: err.message });
  }
  next(err);
};

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: Movie management
 */

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movie]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *                 description: The title of the movie
 *               description:
 *                 type: string
 *                 description: A brief description of the movie
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: The release date of the movie
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  verifyTokenAndAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  handleMulterError,
  createMovie
);

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movie]
 *     responses:
 *       200:
 *         description: A list of movies retrieved successfully
 */
router.get("/", getMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie retrieved successfully
 *       404:
 *         description: Movie not found
 */
router.get("/:id", getMovieById);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movie]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *                 description: The title of the movie
 *               description:
 *                 type: string
 *                 description: A brief description of the movie
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: The release date of the movie
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 */
router.put(
  "/:id",
  verifyTokenAndAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  handleMulterError,
  updateMovie
);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movie]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 */
router.delete("/:id", verifyTokenAndAdmin, deleteMovie);

module.exports = router;
