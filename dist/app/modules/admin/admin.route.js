"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_validation_1 = require("../users/user.validation");
const signup_validation_1 = require("../Signup/signup.validation");
const Roles_1 = require("../../../shared/Roles");
const router = express_1.default.Router();
router.post("/create-admin", (0, validateRequest_1.default)(admin_validation_1.AdminValidation.createAdminZodSchema), admin_controller_1.AdminController.createAdmin);
router.post("/login", (0, validateRequest_1.default)(user_validation_1.LoginValidation.loginZodSchema), admin_controller_1.AdminController.loginAdmin);
router.post("/refresh-token", (0, validateRequest_1.default)(signup_validation_1.SignupValidation.refreshTokenZodSchema), admin_controller_1.AdminController.refreshToken);
// get my profile information
router.get("/my-profile", (0, auth_1.default)(Roles_1.ROLES.ADMIN), admin_controller_1.AdminController.myProfile);
// update my profile information
router.patch("/my-profile", (0, auth_1.default)(Roles_1.ROLES.ADMIN), admin_controller_1.AdminController.updateMyProfile);
exports.AdminRoutes = router;
