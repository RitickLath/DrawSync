import express, { Router } from "express";
import { room } from "../controller";
import { authMiddleware } from "../middleware/auth";

export const roomRouter: Router = express.Router();

roomRouter.post("/room", authMiddleware, room);
