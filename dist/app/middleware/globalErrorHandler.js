"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const config_1 = __importDefault(require("../../config"));
const zod_1 = require("zod");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = "something went wrong";
    let errorMessage = [];
    if (error.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        (statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode),
            (message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message),
            (errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessage);
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        (message = error === null || error === void 0 ? void 0 : error.message),
            (errorMessage = error.message
                ? [{ path: "", message: error === null || error === void 0 ? void 0 : error.message }]
                : []);
    }
    else if (error instanceof Error) {
        (message = error === null || error === void 0 ? void 0 : error.message),
            (errorMessage = (error === null || error === void 0 ? void 0 : error.message)
                ? [{ path: "", message: error === null || error === void 0 ? void 0 : error.message }]
                : []);
    }
    res.status(statusCode).json({
        statusCode,
        success: false,
        message,
        errorMessage,
        stack: config_1.default.env === "production" ? undefined : error.stack,
    });
};
exports.default = globalErrorHandler;
