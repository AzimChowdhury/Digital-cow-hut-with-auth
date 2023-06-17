import express from "express";
import { CowController } from "./cows.controller";
import validateRequest from "../../middleware/validateRequest";
import { CowValidation } from "./cows.validation";

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
router.delete("/:id", CowController.deleteCow);
export const CowRoutes = router;
