"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    cow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Cows",
        required: true,
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
});
exports.Orders = (0, mongoose_1.model)("Orders", orderSchema);
