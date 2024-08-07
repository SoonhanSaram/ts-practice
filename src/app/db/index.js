import Sequelize from "sequelize";
import configJS from "./config.js";
import initModels from "./init-models.js";

const env = process.env.NODE_ENV || 'development';
const config = configJS[env];

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = { sequelize, models : initModels(sequelize) };

export default db;
