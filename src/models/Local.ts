import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../Loaders/db';

interface LocalAttributes {
  localTitle?: string;
  localCity?: string;
}

export default class Local extends Model<LocalAttributes> {
  public localTitle!: string;
  public localCity!: string;

  public static associations: {};
}

//모델 생성
Local.init(
  {
    localTitle: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    localCity: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    modelName: 'Local',
    tableName: 'local',
    sequelize,
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  }
);
