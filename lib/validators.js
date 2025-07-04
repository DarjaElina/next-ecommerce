import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    () => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places",
  );

// Schema for inserting products
export const insertProductsSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatires: z.boolean,
  banner: z.string().nullable(),
  price: currency,
});

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least six characters"),
});

// Schema for signing a user up
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least six characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least six characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
