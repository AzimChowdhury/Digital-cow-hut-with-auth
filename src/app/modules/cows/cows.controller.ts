import { NextFunction, Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { ICow } from "./cows.interface";
import httpStatus from "http-status";
import { CowServices } from "./cows.services";
import pick from "../../../shared/pick";
import { cowFilterableFields } from "./cows.constants";
import { paginationFields } from "../../../shared/pagination";

const createCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await CowServices.createCow(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cows created successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, cowFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await CowServices.getAllCows(filters, paginationOptions);

    sendResponse<ICow[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cows fetched successfully !",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await CowServices.getSingleCow(req.params.id);

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow fetched successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await CowServices.updateCow(id, updateData);
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow data updated successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await CowServices.deleteCow(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow deleted successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
