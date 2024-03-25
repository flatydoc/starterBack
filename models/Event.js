import { db } from "./index.js";

import { DataTypes } from "sequelize";

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
    posterUrl: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    // date: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    // time: {
    //   type: DataTypes.TIME,
    //   allowNull: false,
    // },
    place: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },

    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {}
);

Event.associate = (models) => {
  Event.belongsTo(models.Category, { foreignKey: "categoryId" });
  Event.belongsToMany(models.User, { through: "user_events" });
  Event.belongsToMany(models.Artist, { through: "artist_events" });
};
export default Event;
