"use strict";

import express from "express";
import TasksController from "../controllers/tasksController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, async (req, res, next) => {
  return await new TasksController().add(req, res, next);
});

router.get("/getAll", authMiddleware, async (req, res, next) => {
  return await new TasksController().getAll(req, res, next);
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  return await new TasksController().get(req, res, next);
});

router.put("/complete/:id", authMiddleware, async (req, res, next) => {
  return await new TasksController().complete(req, res, next);
});

export default router;
