import { z } from "zod";
import { roles } from "../users/user.constants";

const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "phone number is required",
    }),
    role: z
      .string({
        required_error: "Role is required",
      })
      .refine((value) => value === "admin", {
        message: "Invalid role. Only 'admin' is allowed.",
      }),
    password: z.string({
      required_error: "password is required",
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
      required_error: "address is required",
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
};
