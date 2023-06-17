"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cows_controller_1 = require("./cows.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const cows_validation_1 = require("./cows.validation");
const router = express_1.default.Router();
// create a cow
router.post("/", (0, validateRequest_1.default)(cows_validation_1.CowValidation.cowZodSchema), cows_controller_1.CowController.createCow);
// get single user
router.get("/:id", cows_controller_1.CowController.getSingleCow);
// update user
router.patch("/:id", cows_controller_1.CowController.updateCow);
// get all user
router.get("/", cows_controller_1.CowController.getAllCows);
// delete a user
router.delete("/:id", cows_controller_1.CowController.deleteCow);
exports.CowRoutes = router;
