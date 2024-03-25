"use strict";

import express from "express";
import EventsController from "../controllers/eventsController.js";
import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAll", async (req, res, next) => {
  return await new EventsController().getAll(req, res, next);
});

router.get("/getBySearch", async (req, res, next) => {
  return await new EventsController().getEventsBySearch(req, res, next);
});

router.get("/getEventsByUserId", isAuth, async (req, res, next) => {
  return await new EventsController().getEventsByUserId(req, res, next);
});

router.get("/getEventsByTitle", async (req, res, next) => {
  return await new EventsController().getByTitle(req, res, next);
});

router.get("/:id", async (req, res, next) => {
  return await new EventsController().getById(req, res, next);
});

router.post("/add", async (req, res, next) => {
  return await new EventsController().add(req, res, next);
});

router.put("/edit", async (req, res, next) => {
  return await new EventsController().edit(req, res, next);
});

router.delete("/:id", async (req, res, next) => {
  return await new EventsController().delete(req, res, next);
});

router.put("/subscribe", isAuth, async (req, res, next) => {
  return await new EventsController().subscribeToEvent(req, res, next);
});

export default router;
