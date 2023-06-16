import { NextFunction, Request, Response } from "express";
import { signupService } from "./signup.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

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

export const signupController = {
  signup,
};
