import express, { Application } from "express";
import * as dotenv from "dotenv";
import { authRouter, roomRouter } from "./route";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/auth", authRouter);

app.post("/chat", roomRouter);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
