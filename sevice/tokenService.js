import jwt from "jsonwebtoken";

import { Tokens } from "../models/Token.js";

export default class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Tokens.findOne({
      where: { user: userId },
    });
    if (tokenData) {
      return await tokenData.update({
        refreshToken,
      });
    }

    return await Tokens.create({
      user: userId,
      refreshToken,
    });
  }

  async findToken(refreshToken) {
    return await Tokens.findOne({
      where: { refreshToken },
    });
  }

  async removeToken(refreshToken) {
    return await Tokens.destroy({
      where: { refreshToken },
    });
  }
}
