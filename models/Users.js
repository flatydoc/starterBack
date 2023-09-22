import db from "../db.js";
import { DataTypes } from "sequelize";
import { Events } from "./Events.js";

export const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
    // subscriptions: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    // },
  },
  {}
);

// Users.belongsToMany(Events, {
//   through: "subscriptions",
//   as: "events",
//   foreignKey: "user_id",
// });
