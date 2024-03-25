import { db } from "./index.js";
import { DataTypes } from "sequelize";

const Artist = db.define(
  "artists",
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
    },
    surname: {
      type: DataTypes.STRING,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Artist.associate = (models) => {
  Artist.belongsToMany(models.User, { through: "user_artists" });
  Artist.belongsToMany(models.Event, { through: "artist_events" });
};

export default Artist;
