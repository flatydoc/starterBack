"use strict";

import express from "express";
import ArtistsController from "../controllers/artistsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.js";

const router = express.Router();

router.get("/getAll", async (req, res, next) => {
  return await new ArtistsController().getAll(req, res, next);
});

router.get("/:id", async (req, res, next) => {
  return await new ArtistsController().get(req, res, next);
});

router.post("/add", isAdminMiddleware, async (req, res, next) => {
  return await new ArtistsController().add(req, res, next);
});

router.put("/edit", isAdminMiddleware, async (req, res, next) => {
  return await new ArtistsController().edit(req, res, next);
});

router.delete("/:id", isAdminMiddleware, async (req, res, next) => {
  return await new ArtistsController().delete(req, res, next);
});

router.put("/subscribe", authMiddleware, async (req, res, next) => {
  return await new ArtistsController().subscribe(req, res, next);
});

export default router;
