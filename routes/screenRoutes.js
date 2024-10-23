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

/**
 * @swagger
 * tags:
 *   name: Screenings
 *   description: Movie screenings management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Screening:
 *       type: object
 *       required:
 *         - movieId
 *         - screeningTime
 *         - availableSeats
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the screening
 *         movieId:
 *           type: string
 *           description: The ID of the movie being screened
 *         screeningTime:
 *           type: string
 *           format: date-time
 *           description: The date and time of the screening
 *         availableSeats:
 *           type: integer
 *           description: The number of available seats for the screening
 */

/**
 * @swagger
 * /api/screenings:
 *   post:
 *     summary: Create a new screening
 *     tags: [Screenings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Screening'
 *     responses:
 *       201:
 *         description: Screening created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyTokenAndAdmin, createScreening);

/**
 * @swagger
 * /api/screenings:
 *   get:
 *     summary: Retrieve all screenings
 *     tags: [Screenings]
 *     responses:
 *       200:
 *         description: List of all screenings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screening'
 */
router.get("/", getScreenings);

/**
 * @swagger
 * /api/screenings/{id}:
 *   get:
 *     summary: Retrieve a screening by ID
 *     tags: [Screenings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Screening details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screening'
 *       404:
 *         description: Screening not found
 */
router.get("/:id", getScreeningById);

/**
 * @swagger
 * /api/screenings/{id}:
 *   put:
 *     summary: Update a screening
 *     tags: [Screenings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Screening'
 *     responses:
 *       200:
 *         description: Screening updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Screening not found
 */
router.put("/:id", verifyTokenAndAdmin, updateScreening);

/**
 * @swagger
 * /api/screenings/{id}:
 *   delete:
 *     summary: Delete a screening
 *     tags: [Screenings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Screening deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Screening not found
 */
router.delete("/:id", verifyTokenAndAdmin, deleteScreening);

/**
 * @swagger
 * /api/screenings/movie/{movieId}:
 *   get:
 *     summary: Get available screenings for a specific movie
 *     tags: [Screenings]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of available screenings for the movie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screening'
 */
router.get("/movie/:movieId", getAvailableScreenings);

module.exports = router;
