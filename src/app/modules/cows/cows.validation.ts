import { z } from "zod";
import { breed, category, label, location } from "./cows.constants";

const cowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    age: z.number({
      required_error: "age is required",
    }),
    price: z.number({
      required_error: "price is required",
    }),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: "location is not valid",
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: "breed is not valid",
    }),
    weight: z.number({
      required_error: "wight is required",
    }),
    label: z.enum([...label] as [string, ...string[]], {
      required_error: "label is not valid",
    }),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: "category is not valid",
    }),
    seller: z.string({
      required_error: "seller id is not valid",
    }),
  }),
});

export const CowValidation = {
  cowZodSchema,
};
