"use strict";

import { validationResult } from "express-validator";

import UserService from "../sevice/userService.js";
import ApiError from "../exceptions/apiErrors.js";

export default class UserController {
  async registration(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Некорректные данные", errors.array()));
      }
      const userData = await new UserService().registration(
        name,
        email,
        password
      );
      res.cookie("token", userData.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      const data = {
        user: userData.user,
        accessToken: userData.accessToken,
      };
      return res.status(201).json({ message: "Пользователь создан", data });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await new UserService().login(email, password);

      return res.status(200).json({ message: "Вход выполнен", data });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.token;
      await new UserService().logout(refreshToken);

      res.clearCookie("token");
      return res.status(200).json({ message: "Выход выполнен" });
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await new UserService().activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    const refreshToken = req.cookies.token;

    const userData = await new UserService().refresh(refreshToken);

    res.cookie("token", userData.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const data = {
      user: userData.user,
      accessToken: userData.accessToken,
    };
    return res.status(200).json({ data });
  }

  async getAll(req, res, next) {
    try {
      const users = await new UserService().getAll();
      if (!users) {
        return next(ApiError.NotFound());
      } else return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}
