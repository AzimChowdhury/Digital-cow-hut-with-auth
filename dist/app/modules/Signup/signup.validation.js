"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("../users/user.constants");
const signupZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "Phone Number is required",
        }),
        role: zod_1.z.enum([...user_constants_1.roles], {
            required_error: "Role cannot be anything other than Buyer or Seller.",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First name is required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last name is required",
            }),
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
exports.SignupValidation = {
    signupZodSchema,
};
