import express from "express";
import { CowController } from "./cows.controller";
import validateRequest from "../../middleware/validateRequest";
import { CowValidation } from "./cows.validation";
import auth from "../../middleware/auth";
import { ADMIN_ROLE } from "../admin/admin.interface";

const router = express.Router();

// create a cow
router.post(
  "/",
  validateRequest(CowValidation.cowZodSchema),
  CowController.createCow
);
// get single user
router.get("/:id", CowController.getSingleCow);
// update user
router.patch("/:id", CowController.updateCow);
// get all user
router.get("/", CowController.getAllCows);
// delete a user
router.delete("/:id", auth(ADMIN_ROLE.ADMIN), CowController.deleteCow);
export const CowRoutes = router;
