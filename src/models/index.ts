import { Sequelize } from 'sequelize';
import { sequelize } from "../Loaders/db"
import Theme from "./theme";
import Warning from "./warning";

export const db = { 
  Sequelize,
  sequelize, 

  // Tables
  Theme, 
  Warning,
};
