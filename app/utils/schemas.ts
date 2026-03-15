import { z } from "zod";

// Shared email validation schema
const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Please enter a valid email address.");

// Login form schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
});

// Sign up form schema
export const signUpSchema = z.object({
  name: z.string().trim().min(1, "Full name is required."),
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// Forgot password form schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// User schema for AuthContext hydration
export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
});

// Inferred types for TypeScript
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type User = z.infer<typeof userSchema>;
