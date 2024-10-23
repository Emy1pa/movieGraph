const express = require("express");
const {
  createSubAdmin,
  updateSubAdmin,
  deleteSubadmin,
} = require("../controllers/subAdminController");

const { verifyTokenAndAdmin } = require("../middlewares/auth");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: SubAdmin
 *   description: SubAdmin management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SubAdmin:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the subadmin
 *         username:
 *           type: string
 *           description: The subadmin username
 *         email:
 *           type: string
 *           description: The subadmin email
 *         password:
 *           type: string
 *           description: The subadmin password
 */

/**
 * @swagger
 * /api/admin/subadmin:
 *   post:
 *     summary: Create a new subadmin
 *     tags: [SubAdmin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubAdmin'
 *     responses:
 *       201:
 *         description: SubAdmin created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

router.post("/subadmin", verifyTokenAndAdmin, createSubAdmin);
/**
 * @swagger
 * /api/admin/subadmin/{id}:
 *   put:
 *     summary: Update a subadmin
 *     tags: [SubAdmin]
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
 *             $ref: '#/components/schemas/SubAdmin'
 *     responses:
 *       200:
 *         description: SubAdmin updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: SubAdmin not found
 */
router.put("/subadmin/:id", verifyTokenAndAdmin, updateSubAdmin);
/**
 * @swagger
 * /api/admin/subadmin/{id}:
 *   delete:
 *     summary: Delete a subadmin
 *     tags: [SubAdmin]
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
 *         description: SubAdmin deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: SubAdmin not found
 */
router.delete("/subadmin/:id", verifyTokenAndAdmin, deleteSubadmin);

module.exports = router;
