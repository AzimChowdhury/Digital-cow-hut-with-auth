import { NextFunction, Request, Response } from "express";
import { orderServices } from "./order.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

const orderCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cow, buyer } = req.body;
    const result = await orderServices.buyCow(cow, buyer);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cows ordered successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderServices.getOrders();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders fetched successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, "id not provided");
  }
  try {
    const result = await orderServices.getSingleOrder(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order fetched successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  orderCow,
  getOrders,
  getSingleOrder,
};
