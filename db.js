import Sequelize from "sequelize";
import config from "./config.js";

const db = new Sequelize(config.postgres.options);

export default db;

export const connectToPostgres = async () => {
  try {
    await db.authenticate();
    await db
      .sync({ alter: true })
      .then(() => {
        console.log("Synced db");
      })
      .catch((err) => {
        console.log("Failed to sync db: " + err.message);
      });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
