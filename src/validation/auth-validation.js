import { z } from "zod";

const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name too long")
      .regex(nameRegex, "Name can only contain letters and spaces"),

    email: z
      .string()
      .email("Invalid email address")
      .regex(emailRegex, "Email format is invalid"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        passwordRegex,
        "Password must include uppercase, lowercase, number, and special character",
      ),

    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters")
      .regex(
        passwordRegex,
        "Confirm password must include uppercase, lowercase, number, and special character",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .regex(emailRegex, "Email format is invalid"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      passwordRegex,
      "Password must include uppercase, lowercase, number, and special character",
    ),
});
