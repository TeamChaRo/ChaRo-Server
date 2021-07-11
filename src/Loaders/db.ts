import { Sequelize } from 'sequelize';
import config from '../config/config';

export const sequelize = new Sequelize(
    config.database as string,
    config.username as string,
    config.password as string,
    {
        host: config.host as string,
        port : parseInt(config.port) as number,
        dialect: 'mysql',
        logging: false
    }
    
  )