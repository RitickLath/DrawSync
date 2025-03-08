import { CreateRoomSchema } from "@repo/data-sanitization/zod";
import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

export const room = async (req: Request, res: Response) => {
  const { name } = req.body;
  const parsedData = CreateRoomSchema.safeParse(name);

  if (!parsedData.success) {
    res.json({ success: false, message: "Incorrect Input" });
  }
  // @ts-ignore
  const userId = req.userId;

  try {
    const room = await prismaClient.room.create({
      data: { slug: name, adminId: userId },
    });
    res.json({ status: true, message: "Room Created", data: room.id });
  } catch (e) {
    res.json({
      status: false,
      message: "Something went wrong with room creation",
    });
  }
};
