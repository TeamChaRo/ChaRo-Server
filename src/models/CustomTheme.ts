import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../Loaders/db';

interface CustomThemeAttributes {
  customThemeTitle?: string;
  customTheme?: string;
}

export default class Custom extends Model<CustomThemeAttributes> {
  public customThemeTitle!: string;
  public customTheme!: string;

  public static associations: {};
}

//모델 생성
Custom.init(
  {
    customThemeTitle: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    customTheme: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    modelName: 'CustomTheme',
    tableName: 'custom_theme',
    sequelize,
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  }
);
