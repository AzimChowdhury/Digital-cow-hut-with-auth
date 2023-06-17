import express from "express";
import { orderController } from "./order.controller";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidation } from "./order.validation";

const router = express.Router();

// order a cow
router.post(
  "/",
  validateRequest(OrderValidation.orderZodSchema),
  orderController.orderCow
);
// get all orders
router.get("/", orderController.getOrders);

export const OrderRoutes = router;
