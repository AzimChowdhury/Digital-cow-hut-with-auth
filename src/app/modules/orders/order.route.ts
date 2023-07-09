import express from "express";
import { orderController } from "./order.controller";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidation } from "./order.validation";
import auth from "../../middleware/auth";
import { ROLES } from "../../../shared/Roles";

const router = express.Router();

// order a cow
router.post(
  "/",
  validateRequest(OrderValidation.orderZodSchema),
  auth(ROLES.BUYER),
  orderController.orderCow
);
// get all orders
router.get(
  "/",
  auth(ROLES.SELLER, ROLES.ADMIN, ROLES.BUYER),
  orderController.getOrders
);

router.get(
  "/:id",
  auth(ROLES.ADMIN, ROLES.BUYER, ROLES.SELLER),
  orderController.getSingleOrder
);
export const OrderRoutes = router;
