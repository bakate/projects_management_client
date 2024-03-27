import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(2),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authenticatedUserSchema = z.object({
  token: z.string(),
  username: z.string(),
  userId: z.string(),
  expiration: z.string().optional(),
});

export type SignUpType = z.infer<typeof SignUpSchema>;

export type LoginType = z.infer<typeof LoginSchema>;

export type UserType = z.infer<typeof authenticatedUserSchema>;
