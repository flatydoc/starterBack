import jwt from "jsonwebtoken";

import Token from "../models/Token.js";

export default class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
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
    const tokenData = await Token.findOne({
      where: { user: userId },
    });
    if (tokenData) {
      return await tokenData.update({
        refreshToken,
      });
    }

    return await Token.create({
      user: userId,
      refreshToken,
    });
  }

  async findToken(refreshToken) {
    return await Token.findOne({
      where: { refreshToken },
    });
  }

  async removeToken(refreshToken) {
    return await Token.destroy({
      where: { refreshToken },
    });
  }
}
