import { createPool, Pool } from 'mysql2/promise'

export const connect = async (): Promise<Pool> => {
  const connection = await createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_mysql_ts',
    port: 3306,
    // connectionLimit: 10,
  })
  return connection
}
