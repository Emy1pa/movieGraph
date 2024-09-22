import express from "express";
import {
  register,
  login,
  updateUser,
  getUsers,
  GetUserById,
  DeleteUser,
  logOut,
} from "../controllers/userController.mjs";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/auth.mjs";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/user/:id", verifyTokenAndAuthorization, updateUser);
router.get("/users", verifyTokenAndAdmin, getUsers);
router.get("/user/:id", verifyTokenAndAuthorization, GetUserById);
router.delete("/user/:id", verifyTokenAndAdmin, DeleteUser);
router.post("/logout", verifyTokenAndAuthorization, logOut);
export default router;
