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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cows_model_1 = require("../cows/cows.model");
const user_model_1 = require("../users/user.model");
const order_model_1 = require("./order.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const buyCow = (cowId, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderedCow = yield cows_model_1.Cows.findById(cowId).populate("seller");
    if (!orderedCow) {
        throw new Error("Cow not found");
    }
    if (orderedCow.label !== "for sale") {
        throw new Error("This Cow is sold out");
    }
    const possiblyBuyer = yield user_model_1.Users.findById(buyerId);
    // Check if the buyer and seller exist
    if (!possiblyBuyer) {
        throw new Error("Buyer not found");
    }
    if (possiblyBuyer.role !== "buyer") {
        throw new Error("provided id is not a buyer's id");
    }
    if (possiblyBuyer.budget < orderedCow.price) {
        throw new Error("Buyer does not have enough money");
    }
    let orderDone = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        orderedCow.label = "sold out";
        yield orderedCow.save({ session });
        possiblyBuyer.budget = possiblyBuyer.budget - orderedCow.price;
        yield possiblyBuyer.save({ session });
        // const update = {
        //   $set: {
        //     budget: possiblyBuyer.budget - orderedCow.price,
        //   },
        // };
        // await Users.updateOne({ _id: possiblyBuyer._id }, update, { session });
        const seller = orderedCow.seller;
        seller.income = seller.income + orderedCow.price;
        yield orderedCow.save({ session });
        const order = { cow: orderedCow._id, buyer: possiblyBuyer._id };
        orderDone = yield order_model_1.Orders.create([order], { session });
        yield session.commitTransaction();
        session.endSession();
        orderDone = yield order_model_1.Orders.findOne({ cow: cowId, buyer: buyerId });
        const orderDetails = { orderedCow, buyer: possiblyBuyer };
        const result = { orderDone, orderDetails };
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Orders.find();
    return result;
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Orders.findOne({ _id: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    return result;
});
exports.orderServices = { buyCow, getOrders, getSingleOrder };
