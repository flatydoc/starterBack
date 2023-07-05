import { DataTypes } from "sequelize";

import db from "../db.js";
import Users from "./Users.js";
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

export default Tokens;
