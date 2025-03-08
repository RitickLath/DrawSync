import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"] ?? "";

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

  if (decoded) {
    //@ts-ignore
    req.id = decoded.id;
    next();
  } else {
    res.status(403).json({ status: false, message: "Unauthorizd" });
    return;
  }
};
