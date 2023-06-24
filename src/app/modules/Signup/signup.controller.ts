import { NextFunction, Request, Response } from "express";
import { signupService } from "./signup.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const result = await signupService.signup(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users sign up successful !",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...data } = req.body;
    const result = await signupService.loginUser(data);
    const { refreshToken, ...others } = result;

    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully !",
      data: others,
    });
  } catch (error) {
    next();
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;

    const result = await signupService.refreshToken(refreshToken);

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
  } catch (error) {
    next();
  }
};

export const signupController = {
  signup,
  loginUser,
  refreshToken,
};
