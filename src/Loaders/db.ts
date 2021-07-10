import { Sequelize } from 'sequelize';
import config from '../config/config';

export const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port : parseInt(config.port),
        dialect: 'mysql',
        logging: false
    }
    
  )