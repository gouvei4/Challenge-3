import express from "express";
import { server } from "./server/server";
import dotenv from "dotenv";
import { connectToMongoDb } from "./database/db";

dotenv.config();

const app = server;
const port = process.env.PORT || 3333;

app.use(express.json());

app.listen(port, () => {
  console.log(`Sever runing on port: ${port}`);
});
connectToMongoDb();
export default app;
