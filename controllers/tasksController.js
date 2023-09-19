"use strict";

import TasksService from "../sevice/tasksService.js";
// import ApiError from "../exceptions/apiErrors.js";

export default class TasksController {
  async add(req, res, next) {
    try {
      const data = await new TasksService().add(req.body);
      return res.status(201).json({ message: "Задача создана", data });
    } catch (error) {
      next(error);
    }
  }

  async complete(req, res, next) {
    try {
      const id = req.params.id;
      await new TasksService().complete(id);
      return res.status(201).json({ message: "Задача выполнена" });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      console.log(req.params);
      const task = await new TasksService().get(req.params.id);
      return res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const tasks = await new TasksService().getAll(req.user.id);
      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
}
