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
const user_validation_1 = require("../users/user.validation");
const router = express_1.default.Router();
router.post("/login", (0, validateRequest_1.default)(user_validation_1.LoginValidation.loginZodSchema), signup_controller_1.signupController.loginUser);
router.post("/signup", (0, validateRequest_1.default)(signup_validation_1.SignupValidation.signupZodSchema), signup_controller_1.signupController.signup);
router.post("/refresh-token", (0, validateRequest_1.default)(signup_validation_1.SignupValidation.refreshTokenZodSchema), signup_controller_1.signupController.refreshToken);
exports.signupRoutes = router;
