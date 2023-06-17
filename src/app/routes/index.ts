import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { signupRoutes } from "../modules/Signup/signup.route";
import { CowRoutes } from "../modules/cows/cows.route";
import { OrderRoutes } from "../modules/orders/order.route";
const router = express.Router();
// build
const moduleRoutes = [
  {
    path: "/auth",
    route: signupRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/cows",
    route: CowRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
