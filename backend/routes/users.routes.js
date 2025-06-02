import express from "express";
import {
  getUsers,
  getUser,
  login,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
const router = express.Router();

router.get("/dashboard", getUsers);
router.post("/login", login);
router.get("/:id", getUser);
router.post("/signup", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
