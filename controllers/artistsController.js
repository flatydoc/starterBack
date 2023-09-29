"use strict";

import ArtistsService from "../sevice/artistsService.js";
import ApiError from "../exceptions/apiErrors.js";

export default class ArtistsController {
  async getAll(req, res, next) {
    try {
      const artists = await new ArtistsService().getAll();
      if (!artists) {
        return next(ApiError.NotFound());
      } else return res.json(artists);
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const artist = await new ArtistsService().get(req.params.id);
      if (!artist) {
        return next(ApiError.NotFound());
      } else return res.json(artist);
    } catch (error) {
      next(error);
    }
  }

  async add(req, res, next) {
    try {
      const data = await new ArtistsService().add(req.body);
      return res.status(201).json({ message: "Артист добавлен", data });
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const data = await new ArtistsService().edit(req.body);
      return res
        .status(201)
        .json({ message: "Данные об артисте обновлены", data });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      await new ArtistsService().delete(req.params.id);
      return res.status(201).json({ message: "Артист удален" });
    } catch (error) {
      next(error);
    }
  }

  async subscribe(req, res, next) {
    try {
      const data = await new ArtistsService().subscribe(
        req.body.id,
        req.user.id
      );
      return res.status(201).json({ message: "Подписка оформлена", data });
    } catch (error) {
      next(error);
    }
  }
}
