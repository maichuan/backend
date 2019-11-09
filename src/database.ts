import { createPool, Pool } from 'mysql2/promise'

console.log(process.env.PMA_HOST, process.env.MYSQL_ROOT_PASSWORD)

export const connect = async (): Promise<Pool> => {
  const connection = await createPool({
    host: process.env.MYSQL_ROOT_HOST || '0.0.0.0',
    user: 'root',
    password: 'password',
    database: 'node_mysql_ts',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
  })

  return connection
}
