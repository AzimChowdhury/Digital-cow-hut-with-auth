import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { signupRoutes } from "../modules/Signup/signup.route";
import { CowRoutes } from "../modules/cows/cows.route";
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
