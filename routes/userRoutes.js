const express = require("express");
const photoUpload = require("../middlewares/photoUpload");

const {
  register,
  login,
  updateUser,
  getUsers,
  getUserById,
  deleteUser,
  logOut,
  getUserInfo,
  getUsersCount,
  banUser,
} = require("../controllers/userController");

const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/auth");

const validateObjectId = require("../middlewares/validateObjectId");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         image:
 *           type: string
 *           description: The user's profile image URL
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

router.post("/register", photoUpload.single("image"), register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post("/login", login);
/**
 * @swagger
 * /api/auth/user/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */

router.put(
  "/user/:id",
  verifyTokenAndAuthorization,
  photoUpload.single("image"),
  updateUser
);

/**
 * @swagger
 * /api/auth/count:
 *   get:
 *     summary: Get total number of users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Total number of users
 *       401:
 *         description: Unauthorized
 */

router.get("/users", verifyToken, getUsers);
/**
 * @swagger
 * /api/auth/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
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
 *         description: User details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get(
  "/user/:id",
  validateObjectId,
  verifyTokenAndAuthorization,
  getUserById
);
/**
 * @swagger
 * /api/auth/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
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
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete("/user/:id", validateObjectId, verifyTokenAndAdmin, deleteUser);
/**
 * @swagger
 * /api/auth/logout/{id}:
 *   post:
 *     summary: Log out a user
 *     tags: [Users]
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
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/logout/:id",
  validateObjectId,
  verifyTokenAndAuthorization,
  logOut
);
/**
 * @swagger
 * /api/auth/me/{id}:
 *   get:
 *     summary: Get current user information
 *     tags: [Users]
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
 *         description: User information
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

router.get(
  "/me/:id",
  validateObjectId,
  verifyTokenAndAuthorization,
  getUserInfo
);
/**
 * @swagger
 * /api/auth/count:
 *   get:
 *     summary: Get total number of users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Total number of users
 *       401:
 *         description: Unauthorized
 */

router.get("/count", verifyTokenAndAdmin, getUsersCount);
/**
 * @swagger
 * /api/auth/users/{id}/ban:
 *   post:
 *     summary: Ban a user
 *     tags: [Users]
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
 *         description: User banned successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.post("/users/:id/ban", verifyToken, banUser);

module.exports = router;
