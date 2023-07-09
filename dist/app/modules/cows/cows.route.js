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
const auth_1 = __importDefault(require("../../middleware/auth"));
const Roles_1 = require("../../../shared/Roles");
const router = express_1.default.Router();
// create a cow
router.post("/", (0, validateRequest_1.default)(cows_validation_1.CowValidation.cowZodSchema), (0, auth_1.default)(Roles_1.ROLES.SELLER), cows_controller_1.CowController.createCow);
// get single cow
router.get("/:id", (0, auth_1.default)(Roles_1.ROLES.SELLER, Roles_1.ROLES.ADMIN, Roles_1.ROLES.BUYER), cows_controller_1.CowController.getSingleCow);
// update cow
router.patch("/:id", (0, auth_1.default)(Roles_1.ROLES.SELLER), cows_controller_1.CowController.updateCow);
// get all cow
router.get("/", (0, auth_1.default)(Roles_1.ROLES.SELLER, Roles_1.ROLES.ADMIN, Roles_1.ROLES.BUYER), cows_controller_1.CowController.getAllCows);
// delete a cow
router.delete("/:id", (0, auth_1.default)(Roles_1.ROLES.SELLER), cows_controller_1.CowController.deleteCow);
exports.CowRoutes = router;
