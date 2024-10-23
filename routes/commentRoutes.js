const express = require("express");
const {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
  getUserComments,
} = require("../controllers/commentController");

const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment management
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *               postId:
 *                 type: string
 *                 description: The ID of the post to which the comment belongs
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, createComment);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comment]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of comments retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", verifyToken, getComments);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *       404:
 *         description: Comment not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", verifyTokenAndAuthorization, getCommentById);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated content of the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.put("/:id", verifyToken, updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.delete("/:id", verifyToken, deleteComment);

/**
 * @swagger
 * /api/comments/user/{userId}:
 *   get:
 *     summary: Get comments by user ID
 *     tags: [Comment]
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
 *         description: List of comments by user retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/user/:userId", verifyToken, getUserComments);

module.exports = router;
