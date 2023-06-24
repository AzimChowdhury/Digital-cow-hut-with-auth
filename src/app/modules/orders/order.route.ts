import express from "express";
import { orderController } from "./order.controller";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidation } from "./order.validation";
import auth from "../../middleware/auth";
import { ADMIN_ROLE } from "../admin/admin.interface";

const router = express.Router();

// order a cow
router.post(
  "/",
  validateRequest(OrderValidation.orderZodSchema),
  orderController.orderCow
);
// get all orders
router.get("/", auth(ADMIN_ROLE.ADMIN), orderController.getOrders);

export const OrderRoutes = router;
