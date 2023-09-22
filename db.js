import { Sequelize } from "sequelize";

import config from "./config.js";

const sequelize = new Sequelize(config.postgres.options);

export default sequelize;

export const connectToPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
