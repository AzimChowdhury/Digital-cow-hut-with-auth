import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { signupRoutes } from "../modules/Signup/signup.route";
import { CowRoutes } from "../modules/cows/cows.route";
import { OrderRoutes } from "../modules/orders/order.route";
import { AdminRoutes } from "../modules/admin/admin.route";
const router = express.Router();

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

  {
    path: "/admins",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
