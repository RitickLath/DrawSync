import { z } from "zod";

// Signup Schema
export const mySignUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address format." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(15, { message: "Password must be at most 15 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (@, $, !, %, *, ?, &).",
    }),

  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(30, { message: "Name must be at most 30 characters long." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),
});

// Signin Schema
export const mySignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address format." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(15, { message: "Password must be at most 15 characters long." }),
});
