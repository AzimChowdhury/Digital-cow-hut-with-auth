import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { SignupValidation } from "./signup.validation";
import { signupController } from "./signup.controller";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(SignupValidation.signupZodSchema),
  signupController.signup
);

export const signupRoutes = router;
