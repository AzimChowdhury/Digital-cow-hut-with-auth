import { Schema, model } from "mongoose";
import { IOrder, OrderModel } from "./order.interface";

const orderSchema = new Schema<IOrder>({
  cow: {
    type: Schema.Types.ObjectId,
    ref: "Cows",
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export const Orders = model<IOrder, OrderModel>("Orders", orderSchema);
