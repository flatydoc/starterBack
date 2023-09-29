"use strict";

import express from "express";
import { check } from "express-validator";

import UserController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Некорректный Email").isEmail(),
    check("password", "Некорректный пароль").exists(),
  ],

  async (req, res, next) => {
    return await new UserController().login(req, res, next);
  }
);

router.post(
  "/registration",
  [
    check("email", "Некорректный Email").isEmail(),
    check("password", "Некорректный пароль").isLength({ min: 6, max: 32 }),
  ],

  async (req, res, next) => {
    return await new UserController().registration(req, res, next);
  }
);

router.post("/logout", async (req, res, next) => {
  return await new UserController().logout(req, res, next);
});
router.get("/activate/:link", async (req, res, next) => {
  return await new UserController().activate(req, res, next);
});
router.get("/refresh", async (req, res, next) => {
  return await new UserController().refresh(req, res, next);
});

export default router;
