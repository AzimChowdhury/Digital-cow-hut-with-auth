import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminServices.createAdmin(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "admin created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const loginAdmin = async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AdminServices.loginAdmin(data);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin logged in successfully !",
    data: others,
  });
};

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AdminServices.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully !",
    data: result,
  });
};

export const AdminController = {
  createAdmin,
  loginAdmin,
  refreshToken,
};
