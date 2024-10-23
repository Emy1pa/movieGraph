const express = require("express");
const {
  createRate,
  getRates,
  getRateById,
  updateRate,
  deleteRate,
  getUserRates,
} = require("../controllers/rateController");

const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rates
 *   description: Rate management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Rate:
 *       type: object
 *       required:
 *         - userId
 *         - movieId
 *         - rating
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the rate
 *         userId:
 *           type: string
 *           description: The ID of the user who rated
 *         movieId:
 *           type: string
 *           description: The ID of the movie being rated
 *         rating:
 *           type: number
 *           format: float
 *           description: The rating given by the user (e.g., from 1 to 10)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the rate was created
 */

/**
 * @swagger
 * /api/rates:
 *   post:
 *     summary: Create a new rate
 *     tags: [Rates]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rate'
 *     responses:
 *       201:
 *         description: Rate created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, createRate);

/**
 * @swagger
 * /api/rates:
 *   get:
 *     summary: Retrieve all rates
 *     tags: [Rates]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all rates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rate'
 */
router.get("/", verifyToken, getRates);

/**
 * @swagger
 * /api/rates/{id}:
 *   get:
 *     summary: Retrieve a rate by ID
 *     tags: [Rates]
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
 *         description: Rate details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rate'
 *       404:
 *         description: Rate not found
 */
router.get("/:id", verifyTokenAndAuthorization, getRateById);

/**
 * @swagger
 * /api/rates/{id}:
 *   put:
 *     summary: Update a rate
 *     tags: [Rates]
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
 *             $ref: '#/components/schemas/Rate'
 *     responses:
 *       200:
 *         description: Rate updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Rate not found
 */
router.put("/:id", verifyToken, updateRate);

/**
 * @swagger
 * /api/rates/{id}:
 *   delete:
 *     summary: Delete a rate
 *     tags: [Rates]
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
 *         description: Rate deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Rate not found
 */
router.delete("/:id", verifyTokenAndAuthorization, deleteRate);

/**
 * @swagger
 * /api/rates/user/{userId}:
 *   get:
 *     summary: Get all rates for a specific user
 *     tags: [Rates]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of rates for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rate'
 */
router.get("/user/:userId", verifyToken, getUserRates);

module.exports = router;
