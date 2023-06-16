import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { signupRoutes } from "../modules/Signup/Signup.route";
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
