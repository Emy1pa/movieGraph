const express = require("express");
const {
  createSubAdmin,
  updateSubAdmin,
  deleteSubadmin,
} = require("../controllers/subAdminController");

const { verifyTokenAndAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/subadmin", verifyTokenAndAdmin, createSubAdmin);
router.put("/subadmin/:id", verifyTokenAndAdmin, updateSubAdmin);
router.delete("/subadmin/:id", verifyTokenAndAdmin, deleteSubadmin);

module.exports = router;
