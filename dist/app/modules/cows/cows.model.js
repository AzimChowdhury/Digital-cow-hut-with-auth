"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cows = void 0;
const mongoose_1 = require("mongoose");
const cows_constants_1 = require("./cows.constants");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: cows_constants_1.location,
    },
    breed: {
        type: String,
        enum: cows_constants_1.breed,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        enum: cows_constants_1.label,
    },
    category: {
        type: String,
        enum: cows_constants_1.category,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cows = (0, mongoose_1.model)("Cows", cowSchema);
