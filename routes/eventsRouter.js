"use strict";

import express from "express";
import EventsController from "../controllers/eventsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/getAll", async (req, res, next) => {
  return await new EventsController().getAll(req, res, next);
});

router.get("/:id", async (req, res, next) => {
  return await new EventsController().get(req, res, next);
});

router.post("/add", adminMiddleware, async (req, res, next) => {
  return await new EventsController().add(req, res, next);
});

router.put("/edit", adminMiddleware, async (req, res, next) => {
  return await new EventsController().edit(req, res, next);
});

router.delete("/:id", adminMiddleware, async (req, res, next) => {
  return await new EventsController().delete(req, res, next);
});

router.put("/subscribe", authMiddleware, async (req, res, next) => {
  return await new EventsController().subscribe(req, res, next);
});

export default router;
