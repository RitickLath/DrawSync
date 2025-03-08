import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mySignInSchema, mySignUpSchema } from "@repo/data-sanitization/zod";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // Validate input
  const isSanitized = mySignUpSchema.safeParse({ email, password, name });
  if (!isSanitized.success) {
    res.status(400).json({
      status: false,
      message: "Validation failed",
      errors: isSanitized.error.format(),
    });
    return;
  }

  try {
    // Check if the user already exists
    const isExists = await prismaClient.user.findUnique({ where: { email } });

    if (isExists) {
      res.status(409).json({
        status: false,
        message: "User already exists. Please log in.",
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    await prismaClient.user.create({
      data: { email, password: hashedPassword, name },
    });

    res.status(201).json({ status: true, message: "User signed up!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred during signup. Please try again.",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate input
  const isSanitized = mySignInSchema.safeParse({ email, password });
  if (!isSanitized.success) {
    res.status(400).json({
      status: false,
      message: "Validation failed",
      errors: isSanitized.error.format(),
    });
    return;
  }

  try {
    // Check if the user exists
    const isExists = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!isExists) {
      res.status(404).json({
        status: false,
        message: "User not found. Please sign up.",
      });
      return;
    }

    // Verify password
    const isPasswordVerified = await bcrypt.compare(
      password,
      isExists.password
    );
    if (!isPasswordVerified) {
      res.status(401).json({
        status: false,
        message: "Incorrect Credentials",
      });
      return;
    }

    // Generate JWT Token
    const payload = { id: isExists.id, email: isExists.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: true,
      message: "User Logged In",
      token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred while logging in.",
    });
  }
};