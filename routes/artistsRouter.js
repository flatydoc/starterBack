"use strict";

import express from "express";
import ArtistsController from "../controllers/artistsController.js";
import { isAuth, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAll", async (req, res, next) => {
  return await new ArtistsController().getAll(req, res, next);
});

router.get("/getArtistsByUserId", isAuth, async (req, res, next) => {
  return await new ArtistsController().getArtistsByUserId(req, res, next);
});

router.get("/getArtistsByEventId", async (req, res, next) => {
  return await new ArtistsController().getArtistsByEventId(req, res, next);
});

router.get("/:id", async (req, res, next) => {
  return await new ArtistsController().getById(req, res, next);
});

router.post("/add", isAuth, isAdmin, async (req, res, next) => {
  return await new ArtistsController().add(req, res, next);
});

router.put("/edit", isAuth, isAdmin, async (req, res, next) => {
  return await new ArtistsController().edit(req, res, next);
});

router.delete("/:id", isAuth, isAdmin, async (req, res, next) => {
  return await new ArtistsController().delete(req, res, next);
});

router.put("/subscribe", isAuth, async (req, res, next) => {
  return await new ArtistsController().subscribeToArtist(req, res, next);
});

export default router;
