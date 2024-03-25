import { db } from "./index.js";
import { DataTypes } from "sequelize";

const Category = db.define(
  "categories",
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
    icon: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Category.associate = (models) => {
  Category.hasMany(models.Event, { foreignKey: "categoryId" });
};
export default Category;
