"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const signup_validation_1 = require("./signup.validation");
const signup_controller_1 = require("./signup.controller");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(signup_validation_1.SignupValidation.signupZodSchema), signup_controller_1.signupController.signup);
exports.signupRoutes = router;
