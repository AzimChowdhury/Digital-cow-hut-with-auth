"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const signup_route_1 = require("../modules/Signup/signup.route");
const cows_route_1 = require("../modules/cows/cows.route");
const order_route_1 = require("../modules/orders/order.route");
const router = express_1.default.Router();
// build
const moduleRoutes = [
    {
        path: "/auth",
        route: signup_route_1.signupRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/cows",
        route: cows_route_1.CowRoutes,
    },
    {
        path: "/orders",
        route: order_route_1.OrderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
