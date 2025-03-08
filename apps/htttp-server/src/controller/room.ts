import { Request, Response } from "express";

export const room = async (req: Request, res: Response) => {
  res.status(501).json({ status: false, message: "Not Implemented" });
};
