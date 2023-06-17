"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cows_constants_1 = require("./cows.constants");
const cowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        age: zod_1.z.number({
            required_error: "age is required",
        }),
        price: zod_1.z.number({
            required_error: "price is required",
        }),
        location: zod_1.z.enum([...cows_constants_1.location], {
            required_error: "location is not valid",
        }),
        breed: zod_1.z.enum([...cows_constants_1.breed], {
            required_error: "breed is not valid",
        }),
        weight: zod_1.z.number({
            required_error: "wight is required",
        }),
        label: zod_1.z.enum([...cows_constants_1.label], {
            required_error: "label is not valid",
        }),
        category: zod_1.z.enum([...cows_constants_1.category], {
            required_error: "category is not valid",
        }),
        seller: zod_1.z.string({
            required_error: "seller id is not valid",
        }),
    }),
});
exports.CowValidation = {
    cowZodSchema,
};
