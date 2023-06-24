import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";
import { AdminController } from "./admin.controller";
import auth from "../../middleware/auth";
import config from "../../../config";
import { ADMIN_ROLE } from "./admin.interface";
import { LoginValidation } from "../users/user.validation";
import { SignupValidation } from "../Signup/signup.validation";
const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  "/login",
  validateRequest(LoginValidation.loginZodSchema),
  auth(ADMIN_ROLE.ADMIN),
  AdminController.loginAdmin
);

router.post(
  "/refresh-token",
  validateRequest(SignupValidation.refreshTokenZodSchema),
  AdminController.refreshToken
);
export const AdminRoutes = router;
