import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";
import { AdminController } from "./admin.controller";
import auth from "../../middleware/auth";
import config from "../../../config";
import { LoginValidation } from "../users/user.validation";
import { SignupValidation } from "../Signup/signup.validation";
import { ROLES } from "../../../shared/Roles";
const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  "/login",
  validateRequest(LoginValidation.loginZodSchema),
  AdminController.loginAdmin
);

router.post(
  "/refresh-token",
  validateRequest(SignupValidation.refreshTokenZodSchema),
  AdminController.refreshToken
);

// get my profile information
router.get("/my-profile", auth(ROLES.ADMIN), AdminController.myProfile);

// update my profile information
router.patch("/my-profile", auth(ROLES.ADMIN), AdminController.updateMyProfile);

export const AdminRoutes = router;
