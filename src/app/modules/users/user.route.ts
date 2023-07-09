import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { ROLES } from "../../../shared/Roles";

const router = express.Router();

// get my profile information
router.get(
  "/my-profile",
  auth(ROLES.SELLER, ROLES.BUYER),
  UserController.myProfile
);

// update my profile information
router.patch(
  "/my-profile",
  auth(ROLES.SELLER, ROLES.BUYER),
  UserController.updateMyProfile
);

// get single user
router.get("/:id", auth(ROLES.ADMIN), UserController.getSingleUser);
// update user
router.patch("/:id", auth(ROLES.ADMIN), UserController.updateUser);
// get all user
router.get("/", auth(ROLES.ADMIN), UserController.getAllUsers);
// delete a user
router.delete("/:id", auth(ROLES.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
