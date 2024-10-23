const express = require("express");
const {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getUserReservations,
} = require("../controllers/reservationController");

const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Reservations management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - userId
 *         - screeningId
 *         - seats
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the reservation
 *         userId:
 *           type: string
 *           description: The ID of the user making the reservation
 *         screeningId:
 *           type: string
 *           description: The ID of the screening for the reservation
 *         seats:
 *           type: array
 *           items:
 *             type: integer
 *           description: The list of seat numbers reserved
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the reservation was created
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, createReservation);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Retrieve all reservations
 *     tags: [Reservations]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
router.get("/", verifyToken, getReservations);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Retrieve a reservation by ID
 *     tags: [Reservations]
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
 *         description: Reservation details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 */
router.get("/:id", verifyTokenAndAuthorization, getReservationById);

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservations]
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
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reservation not found
 */
router.put("/:id", verifyTokenAndAdmin, updateReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
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
 *         description: Reservation deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reservation not found
 */
router.delete("/:id", verifyTokenAndAdmin, deleteReservation);

/**
 * @swagger
 * /api/reservations/user/{userId}:
 *   get:
 *     summary: Get all reservations for a specific user
 *     tags: [Reservations]
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
 *         description: List of reservations for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
router.get("/user/:userId", verifyToken, getUserReservations);

module.exports = router;
