import { sequelize } from "../Loaders/db";
import { db } from "../models";
import config from '../config/config';

const connectDB = async () => {
  try{
    await sequelize.authenticate()
     .then(async () => {
         console.log("connection success");
     })
     .catch((e) => {
         console.log('TT : ', e);
     })
    
     
    const options = {
      force: config.env === 'db_test' ? true : false
    }
    
    //db.sequelize.sync(options).then(() => console.log("Table created"));

  }catch(err){
    console.error(err.message);
    process.exit(1);
  }

};

export default connectDB;
