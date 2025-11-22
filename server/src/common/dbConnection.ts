// dbConnection.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import EnvVars from '@src/common/EnvVars';

dotenv.config();

const pool = mysql.createPool({
  host: EnvVars.MysqlHost,
  user: EnvVars.MysqlUser,
  password: EnvVars.MysqlPassword,
  database: EnvVars.MysqlDatabase,
  waitForConnections: true,
  connectionLimit: 500,
  queueLimit: 0,
});

export default pool;
