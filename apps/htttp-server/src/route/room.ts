import express, { Router } from "express";
import { room } from "../controllers";

export const roomRouter: Router = express.Router();

roomRouter.post("/room", room);
