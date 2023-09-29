import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRouter from "./routes/userRouter.js";
import eventsRouter from "./routes/eventsRouter.js";
import artistsRouter from "./routes/artistsRouter.js";
import { connectToPostgres } from "./db.js";

import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(json({ extended: true }));
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/events", eventsRouter);
app.use("/artists", artistsRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      connectToPostgres();
    });
  } catch (error) {
    console.error(error);
  }
};

start();
