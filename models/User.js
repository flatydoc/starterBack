import { db } from "./index.js";

import { DataTypes } from "sequelize";

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

User.associate = (models) => {
  User.belongsToMany(models.Event, { through: "user_events" });
  User.belongsToMany(models.Artist, { through: "user_artists" });
};

export default User;
