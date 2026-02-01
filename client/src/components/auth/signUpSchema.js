import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .toLowerCase()
      .trim()
      .min(3, { message: "Name should at least be 3 characters" })
      .max(30, { message: "Name should not be more than 30 characters" }),

    email: z
      .string()
      .toLowerCase()
      .trim()
      .email({ message: "Invalid Email Address" }),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/(?=.*[a-z])/, "Must include a lowercase letter")
      .regex(/(?=.*[A-Z])/, "Must include an uppercase letter")
      .regex(/(?=.*\d)/, "Must include a number")
      .regex(/(?=.*[^A-Za-z0-9])/, "Must include a special character"),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/(?=.*[a-z])/, "Must include a lowercase letter")
      .regex(/(?=.*[A-Z])/, "Must include an uppercase letter")
      .regex(/(?=.*\d)/, "Must include a number")
      .regex(/(?=.*[^A-Za-z0-9])/, "Must include a special character"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
