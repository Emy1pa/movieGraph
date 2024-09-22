import express from "express";
import {
  createSubAdmin,
  updateSubAdmin,
  deleteSubadmin,
} from "../controllers/subAdminController.mjs";
import { verifyTokenAndAdmin } from "../middlewares/auth.mjs";

const router = express.Router();

router.post("/subadmin", verifyTokenAndAdmin, createSubAdmin);
router.put("/subadmin/:id", verifyTokenAndAdmin, updateSubAdmin);
router.delete("/subadmin/:id", verifyTokenAndAdmin, deleteSubadmin);
export default router;
