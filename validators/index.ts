import { z } from "zod"

export const CreateAccountSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({message:"Invalid email"}),
    password: z.string().min(5, {message:"Password must be at least 5 characters."}),
});
export type CreateAccountType = z.infer<typeof CreateAccountSchema>;

export const SignInSchema = z.object({
  signin_email: z.string().email({message:"Invalid email"}),
  signin_password: z.string().min(5, {message:"Password must be at least 5 characters."}),
});
export type SignInType = z.infer<typeof SignInSchema>;