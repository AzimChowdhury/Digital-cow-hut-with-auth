import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { ADMIN_ROLE } from "../admin/admin.interface";

const router = express.Router();

// get single user
router.get("/:id", UserController.getSingleUser);
// update user
router.patch("/:id", UserController.updateUser);
// get all user
router.get("/", UserController.getAllUsers);
// delete a user
router.delete("/:id", auth(ADMIN_ROLE.ADMIN), UserController.deleteUser);
export const UserRoutes = router;
