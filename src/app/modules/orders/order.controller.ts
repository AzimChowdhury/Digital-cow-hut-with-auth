import { NextFunction, Request, Response } from "express";
import { orderServices } from "./order.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

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

export const orderController = {
  orderCow,
  getOrders,
};
