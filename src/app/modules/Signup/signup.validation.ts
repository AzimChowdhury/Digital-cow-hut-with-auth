import { z } from "zod";
import { roles } from "../users/user.constants";
const signupZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone Number is required",
    }),
    role: z.enum([...roles] as [string, ...string[]], {
      required_error: "Role cannot be anything other than Buyer or Seller.",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const SignupValidation = {
  signupZodSchema,
};
