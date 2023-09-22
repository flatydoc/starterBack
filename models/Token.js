import db from "../db.js";
import { DataTypes } from "sequelize";
import { Users } from "./Users.js";

export const Tokens = db.define(
  "tokens",
  {
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {}
);
