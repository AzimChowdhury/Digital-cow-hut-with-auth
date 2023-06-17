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
exports.CowServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cows_model_1 = require("./cows.model");
const user_model_1 = require("../users/user.model");
const paginationHelpers_1 = require("../../../shared/paginationHelpers");
const cows_constants_1 = require("./cows.constants");
const createCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.Users.findById(payload.seller);
    if (isExist && isExist.role === "seller") {
        const result = (yield cows_model_1.Cows.create(payload)).populate("seller");
        return result;
    }
    else {
        throw new Error("sellerId did not matched with any seller");
    }
});
const getAllCows = (filters, paginationOptions, minPrice, maxPrice) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cows_constants_1.cowSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    if (minPrice) {
        andConditions.push({
            price: {
                $gte: Number(minPrice),
            },
        });
    }
    if (maxPrice) {
        andConditions.push({
            price: {
                $lte: Number(maxPrice),
            },
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cows_model_1.Cows.find(whereConditions)
        .populate("seller")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = andConditions.length > 0 ? result.length : yield cows_model_1.Cows.countDocuments();
    return {
        success: true,
        statusCode: 200,
        message: "Cows retrieved successfully",
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_model_1.Cows.findOne({ _id: id }).populate("seller");
    return result;
});
const updateCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cows_model_1.Cows.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found !");
    }
    const cowData = __rest(payload, []);
    const updatedCowData = Object.assign({}, cowData);
    const result = yield cows_model_1.Cows.findOneAndUpdate({ _id: id }, updatedCowData, {
        new: true,
    });
    return result;
});
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_model_1.Cows.findByIdAndDelete({ _id: id });
    return result;
});
exports.CowServices = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
