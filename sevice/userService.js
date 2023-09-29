import bcrypt from "bcryptjs";
import { v4 } from "uuid";

import MailService from "./mailService.js";
import TokenService from "./tokenService.js";
import { Users } from "../models/Users.js";
import UserDto from "../dtos/userDto.js";
import ApiError from "../exceptions/apiErrors.js";

export default class UserService {
  async registration(name, email, password) {
    const isUsed = await Users.findOne({ where: { email } });
    if (isUsed) {
      throw ApiError.BadRequest(
        `Пользователь c почтовым адресом ${email} уже существует`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const activationLink = v4();

    await new MailService().sendActivationMail(
      email,
      `${process.env.API_URL}/user/activate/${activationLink}`
    );

    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      activationLink,
    });

    const userDto = new UserDto(user); // id, email, isActivated, isAdmin
    const tokens = new TokenService().generateTokens({ ...userDto });

    await new TokenService().saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} не найден`
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }

    const userDto = new UserDto(user);
    const tokens = new TokenService().generateTokens({ ...userDto });

    await new TokenService().saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await Users.findOne({ where: { activationLink } });

    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }

    await Users.update(
      {
        isActivated: true,
      },
      {
        where: {
          activationLink,
        },
      }
    );
  }

  async logout(refreshToken) {
    return await new TokenService().removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = new TokenService().validateRefreshToken(refreshToken);
    const tokenFromDb = await new TokenService().findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await Users.findOne({
      where: {
        id: userData.id,
      },
    });
    const userDto = new UserDto(user);
    const tokens = new TokenService().generateTokens({ ...userDto });

    await new TokenService().saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}
