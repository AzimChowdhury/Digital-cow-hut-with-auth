import mongoose from "mongoose";
import { Cows } from "../cows/cows.model";
import { Users } from "../users/user.model";
import { IUser } from "../users/user.interface";
import { Orders } from "./order.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const buyCow = async (cowId: string, buyerId: string) => {
  const orderedCow = await Cows.findById(cowId).populate("seller");
  if (!orderedCow) {
    throw new Error("Cow not found");
  }

  if (orderedCow.label !== "for sale") {
    throw new Error("This Cow is sold out");
  }

  const possiblyBuyer = await Users.findById(buyerId);

  // Check if the buyer and seller exist
  if (!possiblyBuyer) {
    throw new Error("Buyer not found");
  }
  if (possiblyBuyer.role !== "buyer") {
    throw new Error("provided id is not a buyer's id");
  }

  if (possiblyBuyer.budget < orderedCow.price) {
    throw new Error("Buyer does not have enough money");
  }

  let orderDone = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    orderedCow.label = "sold out";
    await orderedCow.save({ session });

    possiblyBuyer.budget = possiblyBuyer.budget - orderedCow.price;
    await possiblyBuyer.save({ session });

    // const update = {
    //   $set: {
    //     budget: possiblyBuyer.budget - orderedCow.price,
    //   },
    // };
    // await Users.updateOne({ _id: possiblyBuyer._id }, update, { session });

    const seller = orderedCow.seller as IUser;

    seller.income = seller.income + orderedCow.price;
    await orderedCow.save({ session });

    const order = { cow: orderedCow._id, buyer: possiblyBuyer._id };
    orderDone = await Orders.create([order], { session });
    await session.commitTransaction();
    session.endSession();

    orderDone = await Orders.findOne({ cow: cowId, buyer: buyerId });
    const orderDetails = { orderedCow, buyer: possiblyBuyer };
    const result = { orderDone, orderDetails };
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getOrders = async () => {
  const result = await Orders.find();
  return result;
};

const getSingleOrder = async (id: string) => {
  const result = await Orders.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  return result;
};

export const orderServices = { buyCow, getOrders, getSingleOrder };
