const express = require("express");
const {
  register,
  login,
  updateUser,
  getUsers,
  getUserById, // Remplacé ici
  deleteUser,
  logOut,
  getUserInfo,
} = require("../controllers/userController");

const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/user/:id", verifyTokenAndAuthorization, updateUser);
router.get("/users", verifyTokenAndAdmin, getUsers);
router.get("/user/:id", verifyTokenAndAuthorization, getUserById);
router.delete("/user/:id", verifyTokenAndAdmin, deleteUser);
router.post("/logout", verifyTokenAndAuthorization, logOut);
router.get("/me/:id", verifyTokenAndAuthorization, getUserInfo);

module.exports = router;
