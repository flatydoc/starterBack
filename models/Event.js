import db from "../db.js";
import User from "./User.js";
import { DataTypes } from "sequelize";
import UserEvent from "./UserEvent.js";

const Event = db.define(
  "events",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
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

    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {}
);

Event.associations = () => {
  Event.belongsToMany(User, {
    through: UserEvent,
    // as: "user_events",
    foreignKey: "eventId",
  });
};

export default Event;
