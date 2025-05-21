import z from "zod";
import { email } from "zod/v4";

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(20),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(10),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const LogInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(10),
});

export type LoginFormData = z.infer<typeof LogInSchema>;
