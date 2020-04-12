import { Sequelize } from 'sequelize-typescript'

console.log(
  '====>',
  process.env.PMA_HOST,
  process.env.MYSQL_ROOT_PASSWORD,
  __dirname + '/models',
)

export const sequelize = new Sequelize({
  database: 'node_mysql_ts',
  dialect: 'mysql',
  username: 'root',
  password: 'password',
  host: process.env.MYSQL_ROOT_HOST || '0.0.0.0',
  port: 3306,
  models: [__dirname + '/models'],
  timezone: '+07:00',
})
