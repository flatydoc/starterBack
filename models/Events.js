import db from "../db.js";
import { DataTypes } from "sequelize";
import { Users } from "./Users.js";

export const Events = db.define(
  "events",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    artists: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    // subscribers: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    // },
  },
  {}
);

// Events.belongsToMany(Users, {
//   through: "subscriptions",
//   as: "users",
//   foreignKey: "event_id",
// });
