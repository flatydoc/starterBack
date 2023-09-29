"use strict";

import EventsService from "../sevice/eventsService.js";
import ApiError from "../exceptions/apiErrors.js";

export default class EventsController {
  async getAll(req, res, next) {
    try {
      const events = await new EventsService().getAll();
      if (!events) {
        return next(ApiError.NotFound());
      } else return res.json(events);
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const event = await new EventsService().get(req.params.id);
      if (!event) {
        return next(ApiError.NotFound());
      } else return res.json(event);
    } catch (error) {
      next(error);
    }
  }

  async add(req, res, next) {
    try {
      const data = await new EventsService().add(req.body);
      return res.status(201).json({ message: "Событие создано", data });
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const data = await new EventsService().edit(req.body);
      return res.status(201).json({ message: "Событие отредактировано", data });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      await new EventsService().delete(req.params.id);
      return res.status(201).json({ message: "Событие удалено" });
    } catch (error) {
      next(error);
    }
  }

  async subscribe(req, res, next) {
    try {
      const data = await new EventsService().subscribe(
        req.body.id,
        req.user.id
      );
      return res.status(201).json({ message: "Подписка оформлена", data });
    } catch (error) {
      next(error);
    }
  }
}
