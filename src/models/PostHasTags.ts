import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../Loaders/db';

interface PHTagAttributes {
  postId?: number;
  region?: string;
  theme?: string;
  warning?: string;
}

export default class PostHasTheme extends Model<PHTagAttributes> {
  public postId!: number;
  public region!: string;
  public theme!: string;
  public warning!: string;
  public static associations: {};
}

PostHasTheme.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    region: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    theme: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    warning: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    modelName: 'PostHasTags',
    tableName: 'post_has_tags',
    sequelize,
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  }
);
