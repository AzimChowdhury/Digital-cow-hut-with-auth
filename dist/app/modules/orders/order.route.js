"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const order_validation_1 = require("./order.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const Roles_1 = require("../../../shared/Roles");
const router = express_1.default.Router();
// order a cow
router.post("/", (0, validateRequest_1.default)(order_validation_1.OrderValidation.orderZodSchema), (0, auth_1.default)(Roles_1.ROLES.BUYER), order_controller_1.orderController.orderCow);
// get all orders
router.get("/", (0, auth_1.default)(Roles_1.ROLES.SELLER, Roles_1.ROLES.ADMIN, Roles_1.ROLES.BUYER), order_controller_1.orderController.getOrders);
router.get("/:id", (0, auth_1.default)(Roles_1.ROLES.ADMIN, Roles_1.ROLES.BUYER, Roles_1.ROLES.SELLER), order_controller_1.orderController.getSingleOrder);
exports.OrderRoutes = router;
