import express from "express";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  await prismaClient.user.create({
    data: {
      email: "testing",
      password: "testing",
      name: "testing",
    },
  });
  res.send("Successful");
});

app.post("/signin", (req, res) => {});

app.post("/chat-room", (req, res) => {});

app.listen(3001, () => {
  console.log("Server running");
});
