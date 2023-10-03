import db from "../db.js";
import { DataTypes } from "sequelize";

const UserEvent = db.define(
  "user_events",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "events",
        key: "id",
      },
    },
  },
  { timestamps: false }
);

export default UserEvent;
