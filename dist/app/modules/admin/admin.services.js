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
exports.AdminServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role !== "admin") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Role is not acceptable");
    }
    const result = yield admin_model_1.Admin.create(payload);
    const { phoneNumber, role, name, address, _id } = result;
    return { phoneNumber, role, name, address, _id };
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isAdminExist = yield admin_model_1.Admin.isAdminExist(phoneNumber);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin does not exist");
    }
    if ((yield admin_model_1.Admin.isPasswordMatched(password, isAdminExist.password)) === false) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    const { _id, role } = isAdminExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh Token");
    }
    const { _id } = verifiedToken;
    const isAdminExist = yield admin_model_1.Admin.isAdminExist(_id);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin does not exist");
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isAdminExist._id,
        role: isAdminExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const myProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findOne({ _id: id });
    if (result) {
        const { name, phoneNumber, role, _id, address } = result;
        return { name, phoneNumber, role, _id, address };
    }
    else {
        throw new Error();
    }
});
const updateMyProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield admin_model_1.Admin.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "profile not found !");
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updatedUserData = Object.assign({}, userData);
    // dynamically handling
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedUserData[nameKey] = name[key];
        });
    }
    const result = yield admin_model_1.Admin.findOneAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    });
    return result;
});
exports.AdminServices = {
    createAdmin,
    loginAdmin,
    refreshToken,
    myProfile,
    updateMyProfile,
};
