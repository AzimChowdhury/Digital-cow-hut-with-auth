"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_services_1 = require("./admin.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield admin_services_1.AdminServices.createAdmin(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "admin created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = __rest(req.body, []);
    const result = yield admin_services_1.AdminServices.loginAdmin(data);
    const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
    const cookieOptions = {
        secure: config_1.default.env === "production",
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Admin logged in successfully !",
        data: others,
    });
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);
    const result = yield admin_services_1.AdminServices.refreshToken(refreshToken);
    const cookieOptions = {
        secure: config_1.default.env === "production",
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User logged in successfully !",
        data: result,
    });
});
const myProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new Error("Token is not provided");
    }
    try {
        const verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        const { _id } = verifiedToken;
        const result = yield admin_services_1.AdminServices.myProfile(_id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "My profile information fetched successfully !",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateMyProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new Error("Token is not provided");
    }
    try {
        const verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        const { _id } = verifiedToken;
        const updateData = req.body;
        const result = yield admin_services_1.AdminServices.updateMyProfile(_id, updateData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Profile updated successfully !",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AdminController = {
    createAdmin,
    loginAdmin,
    refreshToken,
    myProfile,
    updateMyProfile,
};
