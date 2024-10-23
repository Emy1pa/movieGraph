const express = require("express");
const {
  createRoom,
  getRooms,
  getRoomById,
  updateTheRoom,
  deleteRoom,
} = require("../controllers/roomController");

const { verifyTokenAndAdmin } = require("../middlewares/auth");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - name
 *         - capacity
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the room
 *         name:
 *           type: string
 *           description: The name of the room
 *         capacity:
 *           type: integer
 *           description: The capacity of the room
 * amenities:
 *           type: array
 *           items:
 *             type: string
 *           description: List of amenities in the room
 */

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

router.post("/", verifyTokenAndAdmin, createRoom);
/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       401:
 *         description: Unauthorized
 */
router.get("/", verifyTokenAndAdmin, getRooms);
/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get a room by ID
 *     tags: [Rooms]
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
 *         description: Room details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 */

router.get("/:id", verifyTokenAndAdmin, getRoomById);
/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room
 *     tags: [Rooms]
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
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 */
router.put("/:id", verifyTokenAndAdmin, updateTheRoom);
/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room
 *     tags: [Rooms]
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
 *         description: Room deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Room not found
 */
router.delete("/:id", verifyTokenAndAdmin, deleteRoom);

module.exports = router;
