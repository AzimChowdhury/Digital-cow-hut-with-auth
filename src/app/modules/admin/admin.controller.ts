import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import { IAdmin } from "./admin.interface";

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
  console.log(refreshToken);
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

const myProfile = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("Token is not provided");
  }
  try {
    const verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    const { _id } = verifiedToken;
    const result = await AdminServices.myProfile(_id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile information fetched successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("Token is not provided");
  }
  try {
    const verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    const { _id } = verifiedToken;

    const updateData = req.body;
    const result = await AdminServices.updateMyProfile(_id, updateData);
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile updated successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  createAdmin,
  loginAdmin,
  refreshToken,
  myProfile,
  updateMyProfile,
};
