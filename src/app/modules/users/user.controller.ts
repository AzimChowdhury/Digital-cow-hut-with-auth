import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { IAdmin } from "../admin/admin.interface";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserServices.getAllUsers();

    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users fetched successfully !",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserServices.getSingleUser(req.params.id);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User fetched successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await UserServices.updateUser(id, updateData);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await UserServices.deleteUser(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted successfully !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
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
    const result = await UserServices.myProfile(_id);
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
    const result = await UserServices.updateMyProfile(_id, updateData);
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

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  myProfile,
  updateMyProfile,
};
