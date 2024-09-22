import express from "express";
import {
  getResetPasswordView,
  sendForgotPasswordLink,
  resetThePassword,
  getForgotPasswordView,
} from "../controllers/passwordController.mjs";
const router = express.Router();
router
  .route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);
router
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordView)
  .post(resetThePassword);
export default router;
