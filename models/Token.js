import { db } from "./index.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const Token = db.define(
  "tokens",
  {
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {}
);

export default Token;
