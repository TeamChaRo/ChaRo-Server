import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../Loaders/db';

interface PHIAttributes {
  postId?: number;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
}

export default class PostHasImage extends Model<PHIAttributes> {
  public postId!: number;
  public image1!: string;
  public image2!: string;
  public image3!: string;
  public image4!: string;
  public image5!: string;
  public image6!: string;

  public static associations: {};
}

PostHasImage.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    image1: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    image2: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    image3: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    image4: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    image5: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    image6: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    modelName: 'PostHasImage',
    tableName: 'post_has_image',
    sequelize,
    freezeTableName: true,
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  }
);
