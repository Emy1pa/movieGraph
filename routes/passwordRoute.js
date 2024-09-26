const express = require("express");
const {
  getResetPasswordView,
  sendForgotPasswordLink,
  resetThePassword,
  getForgotPasswordView,
} = require("../controllers/passwordController");

const router = express.Router();

router
  .route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);

router
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordView)
  .post(resetThePassword);

module.exports = router;
