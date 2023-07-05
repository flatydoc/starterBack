import { Sequelize } from "sequelize";

import config from "./config.js";

const sequelize = new Sequelize(config.postgres.options);

export default sequelize;
