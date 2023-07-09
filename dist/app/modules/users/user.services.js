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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.find();
    const total = yield user_model_1.Users.countDocuments();
    return {
        success: true,
        statusCode: 200,
        message: "Users retrieved successfully",
        meta: {
            total,
        },
        data: result,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.findOne({ _id: id });
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.Users.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
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
    const result = yield user_model_1.Users.findOneAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.findByIdAndDelete({ _id: id });
    return result;
});
const myProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.findOne({ _id: id });
    if (result) {
        const { name, phoneNumber, role, _id, address } = result;
        return { name, phoneNumber, role, _id, address };
    }
    else {
        throw new Error();
    }
});
const updateMyProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.Users.findOne({ _id: id });
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
    const result = yield user_model_1.Users.findOneAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    });
    return result;
});
exports.UserServices = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    myProfile,
    updateMyProfile,
};
