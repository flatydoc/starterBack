import db from "../db.js";
import User from "./User.js";
import Event from "./Event.js";
import Artist from "./Artist.js";
import Category from "./Category.js";

const models = {
  User,
  Event,
  Artist,
  Category,
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

export { db };

export default models;
