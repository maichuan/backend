"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
// console.log(
//   '====>',
//   process.env.NOTIFICATION_HOST,
//   process.env.PMA_HOST,
//   process.env.MYSQL_ROOT_PASSWORD,
//   __dirname + '/models',
// )
const devConfig = {
    database: 'node_mysql_ts',
    dialect: 'mysql',
    username: 'root',
    password: 'password',
    host: process.env.MYSQL_ROOT_HOST || '0.0.0.0',
    port: 3306,
    models: [__dirname + '/models'],
    dialectOptions: {
        useUTC: false,
    },
    timezone: 'Asia/Bangkok',
};
const prodConfig = {
    database: 'node_mysql_ts',
    dialect: 'mysql',
    username: 'root',
    password: 'password',
    port: 3306,
    models: [__dirname + '/models'],
    dialectOptions: {
        socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
        useUTC: false,
    },
    timezone: 'Asia/Bangkok',
};
const config = process.env.CLOUD_SQL_CONNECTION_NAME ? prodConfig : devConfig;
exports.sequelize = new sequelize_typescript_1.Sequelize(config);
