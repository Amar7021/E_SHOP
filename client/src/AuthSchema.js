import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required!")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required!")
    .min(8, "Password must be at least 8 characters!")
    .max(20, "Password must be less than 20 characters!"),
})

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required!")
    .email("Invalid email address"),
  username: z
    .string()
    .min(1, "Username is required!")
    .min(3, "Username must be at least 3 characters!")
    .max(16, "Username must be less than 16 characters!"),
  password: z
    .string()
    .min(1, "Password is required!")
    .min(8, "Password must be at least 8 characters!")
    .max(20, "Password must be less than 20 characters!"),
})
