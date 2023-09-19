import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRouter from "./routes/userRouter.js";
import tasksRouter from "./routes/tasksRouter.js";
import sequelize from "./db.js";
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
app.use("/tasks", tasksRouter);
app.use(errorMiddleware);

const connectToPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

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
