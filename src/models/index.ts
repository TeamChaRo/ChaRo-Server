import { Sequelize } from 'sequelize';
import { sequelize } from "../Loaders/db"
import Theme from "./Theme";
import Warning from "./Warning";
import User from "./User";

export const db = { 
  Sequelize,
  sequelize, 

  // Tables
  Theme, 
  Warning,
  User,
};
