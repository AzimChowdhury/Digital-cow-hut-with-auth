import { ErrorRequestHandler } from "express";
import { IGenericErrorMessage } from "../../shared/error";
import handleValidationError from "../../errors/handleValidationError";
import handleZodError from "../../errors/handleZodError";
import handleCastError from "../../errors/handleCastError";
import config from "../../config";
import { ZodError } from "zod";
import ApiError from "../../errors/ApiError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "something went wrong";
  let errorMessage: IGenericErrorMessage[] = [];

  if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorMessage = simplifiedError?.errorMessage);
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    (message = error?.message),
      (errorMessage = error.message
        ? [{ path: "", message: error?.message }]
        : []);
  } else if (error instanceof Error) {
    (message = error?.message),
      (errorMessage = error?.message
        ? [{ path: "", message: error?.message }]
        : []);
  }

  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errorMessage,
    stack: config.env === "production" ? undefined : error.stack,
  });
};

export default globalErrorHandler;
