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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupService = void 0;
const user_model_1 = require("../users/user.model");
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role === "buyer" && (!payload.budget || payload.budget === 0)) {
        throw new Error("Buyer must have budget");
    }
    else if (payload.role === "seller" &&
        (!payload.income || payload.income === 0)) {
        payload.income = 0;
    }
    const result = yield user_model_1.Users.create(payload);
    return result;
});
exports.signupService = {
    signup,
};
