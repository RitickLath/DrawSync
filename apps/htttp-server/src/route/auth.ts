import express, { Router } from "express";
import { signin, signup } from "../controller";

export const authRouter: Router = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/signin", signin);
