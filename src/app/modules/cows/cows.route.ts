import express from "express";
import { CowController } from "./cows.controller";
import validateRequest from "../../middleware/validateRequest";
import { CowValidation } from "./cows.validation";
import auth from "../../middleware/auth";
import { ROLES } from "../../../shared/Roles";

const router = express.Router();

// create a cow
router.post(
  "/",
  validateRequest(CowValidation.cowZodSchema),
  auth(ROLES.SELLER),
  CowController.createCow
);
// get single cow
router.get(
  "/:id",
  auth(ROLES.SELLER, ROLES.ADMIN, ROLES.BUYER),
  CowController.getSingleCow
);
// update cow
router.patch("/:id", auth(ROLES.SELLER), CowController.updateCow);
// get all cow
router.get(
  "/",
  auth(ROLES.SELLER, ROLES.ADMIN, ROLES.BUYER),
  CowController.getAllCows
);
// delete a cow
router.delete("/:id", auth(ROLES.SELLER), CowController.deleteCow);
export const CowRoutes = router;
