const express = require("express");
const {
  addFavorite,
  getUserFavorites,
  removeFavorite,
} = require("../controllers/favoriteController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: Favorite management
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add a favorite item
 *     tags: [Favorite]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: The ID of the item to be added to favorites
 *     responses:
 *       201:
 *         description: Favorite added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, addFavorite);

/**
 * @swagger
 * /api/favorites/user/{userId}:
 *   get:
 *     summary: Get user's favorite items
 *     tags: [Favorite]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's favorite items retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/user/:userId", verifyToken, getUserFavorites);

/**
 * @swagger
 * /api/favorites:
 *   delete:
 *     summary: Remove a favorite item
 *     tags: [Favorite]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: The ID of the item to be removed from favorites
 *     responses:
 *       200:
 *         description: Favorite removed successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.delete("/", verifyToken, removeFavorite);

module.exports = router;
