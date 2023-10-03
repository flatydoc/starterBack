import db from "../db.js";
import Event from "./Event.js";
import { DataTypes } from "sequelize";
import UserEvent from "./UserEvent.js";

const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activationLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

User.associations = () => {
  User.belongsToMany(Event, {
    through: UserEvent,
    // as: "user_events",
    foreignKey: "userId",
  });
};

export default User;
