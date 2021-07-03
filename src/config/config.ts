import dotenv from "dotenv";



const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  env : process.env.NODE_ENV || 'development',
  username : process.env.DB_USERNAME || 'root',
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DBNAME || 'charo_test',
  host : process.env.DB_HOST,
  port : process.env.DB_PORT,
  socketPath: '/var/run/mysqld/mysqld.sock',
  dialect : "mysql"
};
