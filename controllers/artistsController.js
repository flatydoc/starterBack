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

  async getById(req, res, next) {
    try {
      const artist = await new ArtistsService().getById(req.params.id);
      if (!artist) {
        return next(ApiError.NotFound());
      } else return res.json(artist);
    } catch (error) {
      next(error);
    }
  }

  async getArtistsByUserId(req, res, next) {
    try {
      const artists = await new ArtistsService().getArtistsByUserId(
        req.user.id
      );
      if (!artists) {
        return next(ApiError.NotFound());
      } else return res.json(artists);
    } catch (error) {
      next(error);
    }
  }

  async getArtistsByEventId(req, res, next) {
    try {
      const artists = await new ArtistsService().getArtistsByEventId(
        req.query.id
      );
      if (!artists) {
        return next(ApiError.NotFound());
      } else return res.json(artists);
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

  async subscribeToArtist(req, res, next) {
    try {
      const data = await new ArtistsService().subscribeToArtist(
        req.body.id,
        req.user.id
      );
      return res.status(201).json({ message: "Подписка оформлена", data });
    } catch (error) {
      next(error);
    }
  }
}
