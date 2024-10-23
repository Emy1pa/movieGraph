const express = require("express");
const {
  getResetPasswordView,
  sendForgotPasswordLink,
  resetThePassword,
  getForgotPasswordView,
  verifyResetToken,
} = require("../controllers/passwordController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Password
 *   description: Password management and reset
 */

/**
 * @swagger
 * /api/password/forgot-password:
 *   get:
 *     summary: Get the forgot password view
 *     tags: [Password]
 *     responses:
 *       200:
 *         description: Forgot password view retrieved successfully
 */
router.get("/forgot-password", getForgotPasswordView);

/**
 * @swagger
 * /api/password/forgot-password:
 *   post:
 *     summary: Send forgot password link
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user requesting a password reset
 *     responses:
 *       200:
 *         description: Forgot password link sent successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.post("/forgot-password", sendForgotPasswordLink);

/**
 * @swagger
 * /api/password/reset-password/{userId}/{token}:
 *   get:
 *     summary: Get the reset password view
 *     tags: [Password]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reset password view retrieved successfully
 *       400:
 *         description: Invalid token or user ID
 */
router.get("/reset-password/:userId/:token", getResetPasswordView);

/**
 * @swagger
 * /api/password/reset-password/{userId}/{token}:
 *   post:
 *     summary: Reset the password
 *     tags: [Password]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid token, user ID, or input
 */
router.post("/reset-password/:userId/:token", resetThePassword);

/**
 * @swagger
 * /api/password/verify-token/{userId}/{token}:
 *   get:
 *     summary: Verify the reset token
 *     tags: [Password]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token verified successfully
 *       400:
 *         description: Invalid token or user ID
 */
router.get("/verify-token/:userId/:token", verifyResetToken);

module.exports = router;
