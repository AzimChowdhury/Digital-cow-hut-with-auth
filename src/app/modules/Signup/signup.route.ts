import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { SignupValidation } from "./signup.validation";
import { signupController } from "./signup.controller";
import { LoginValidation } from "../users/user.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(SignupValidation.signupZodSchema),
  signupController.signup
);

router.post(
  "/login",
  validateRequest(LoginValidation.loginZodSchema),
  signupController.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(SignupValidation.refreshTokenZodSchema),
  signupController.refreshToken
);
export const signupRoutes = router;
