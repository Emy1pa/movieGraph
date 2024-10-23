const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/statisticsController");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Statistics]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userCount:
 *                   type: integer
 *                   description: The total number of users
 *                 movieCount:
 *                   type: integer
 *                   description: The total number of movies
 *                 commentCount:
 *                   type: integer
 *                   description: The total number of comments
 *                 reservationCount:
 *                   type: integer
 *                   description: The total number of reservations
 *                 totalRevenue:
 *                   type: number
 *                   description: The total revenue generated
 *                 activeUsers:
 *                   type: integer
 *                   description: The number of active users
 */

router.get("/", verifyToken, getDashboardStats);

module.exports = router;
