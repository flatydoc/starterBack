"use strict";

import categoriesService from "../sevice/categoriesService.js";
import ApiError from "../exceptions/apiErrors.js";

export default class categoriesController {
  async getAll(req, res, next) {
    try {
      const categories = await new categoriesService().getAll();
      if (!categories) {
        return next(ApiError.NotFound());
      } else return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async add(req, res, next) {
    try {
      const data = await new categoriesService().add(req.body);
      return res.status(201).json({ message: "Категория создана", data });
    } catch (error) {
      next(error);
    }
  }

  async addEvent(req, res, next) {
    try {
      const data = await new categoriesService().addEvent(
        req.body.categoryId,
        req.body.eventId
      );
      return res
        .status(201)
        .json({ message: "Ивент добавлен в категорию", data });
    } catch (error) {
      next(error);
    }
  }
}
