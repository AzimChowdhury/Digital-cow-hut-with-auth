"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const Roles_1 = require("../../../shared/Roles");
const router = express_1.default.Router();
// get my profile information
router.get("/my-profile", (0, auth_1.default)(Roles_1.ROLES.SELLER, Roles_1.ROLES.BUYER), user_controller_1.UserController.myProfile);
// update my profile information
router.patch("/my-profile", (0, auth_1.default)(Roles_1.ROLES.SELLER, Roles_1.ROLES.BUYER), user_controller_1.UserController.updateMyProfile);
// get single user
router.get("/:id", (0, auth_1.default)(Roles_1.ROLES.ADMIN), user_controller_1.UserController.getSingleUser);
// update user
router.patch("/:id", (0, auth_1.default)(Roles_1.ROLES.ADMIN), user_controller_1.UserController.updateUser);
// get all user
router.get("/", (0, auth_1.default)(Roles_1.ROLES.ADMIN), user_controller_1.UserController.getAllUsers);
// delete a user
router.delete("/:id", (0, auth_1.default)(Roles_1.ROLES.ADMIN), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
