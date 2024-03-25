"use strict";

import express from "express";
import categoriesController from "../controllers/categoriesController.js";
import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAll", async (req, res, next) => {
  return await new categoriesController().getAll(req, res, next);
});

router.post("/add", isAuth, isAdmin, async (req, res, next) => {
  return await new categoriesController().add(req, res, next);
});

router.put("/addEvent", isAuth, isAdmin, async (req, res, next) => {
  return await new categoriesController().addEvent(req, res, next);
});

export default router;
