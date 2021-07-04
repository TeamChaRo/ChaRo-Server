import { Sequelize } from 'sequelize';
import { sequelize } from "../Loaders/db"
import Theme from "./Theme";
import Warning from "./Warning";
import User from "./User";

/* follow - User */
User.belongsToMany(User, { as: 'following', timestamps:false, through: "follow", foreignKey: 'follwing' });
User.belongsToMany(User, { as: 'follower', timestamps:false, through: "follow", foreignKey: 'follower' });

export const db = { 
  Sequelize,
  sequelize, 

  // Tables
  Theme, 
  Warning,
  User,
};
