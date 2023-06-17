import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

// get single user
router.get("/:id", UserController.getSingleUser);
// update user
router.patch("/:id", UserController.updateUser);
// get all user
router.get("/", UserController.getAllUsers);

export const UserRoutes = router;
