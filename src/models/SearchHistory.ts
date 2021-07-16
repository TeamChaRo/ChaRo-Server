import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../Loaders/db';

interface SHAttributes {
  userId?: string;
  title?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
}

export default class SearchHistory extends Model<SHAttributes> {
  public userId!: string;
  public title!: string;
  public address!: string;
  public latitude!: string;
  public longitude!: string;

  public static associations: {};
}

SearchHistory.init(
  {
    userId: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    modelName: 'SearchHistory',
    tableName: 'search_history',
    sequelize,
    freezeTableName: true,
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  }
);
