import {Sequelize} from 'sequelize';
import  config from '../config/config';

const connectDB = async () => {
  try{
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
          host: config.host,
          dialect: 'mysql',
      }
    )
      
    await sequelize.authenticate()
     .then(async () => {
         console.log("connection success");
     })
     .catch((e) => {
         console.log('TT : ', e);
     })
  }catch(err){
    console.error(err.message);
    process.exit(1);
  }

};

export default connectDB;
