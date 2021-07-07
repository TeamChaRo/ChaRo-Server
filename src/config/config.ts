import dotenv from "dotenv";



const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * MySql
   */
  username : process.env.DB_USERNAME || 'root',
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DBNAME || 'charo_test',
  host : process.env.DB_HOST,
  port : process.env.DB_PORT,
  socketPath: '/var/run/mysqld/mysqld.sock',
  dialect : "mysql",

  /**
   * S3
   */
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
};
