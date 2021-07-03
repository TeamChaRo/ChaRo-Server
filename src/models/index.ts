import { Sequelize } from 'sequelize';
import { sequelize } from "../Loaders/db"
import Theme from "./Theme";
import Warning from "./Warning";

export const db = { 
  Sequelize,
  sequelize, 

  // Tables
  Theme, 
  Warning,
};
