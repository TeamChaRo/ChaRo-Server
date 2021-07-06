import {
    DataTypes, 
    Model, 
} from 'sequelize';
import {sequelize} from "../Loaders/db"

interface BannerAttributes {
    bannerTitle?: string,
    bannerImage?: string,
    bannerTag?: string
};

export default class Banner extends Model<BannerAttributes> {

    public bannerTitle!: string;
    public bannerImage!: string;
    public bannerTag!: string;

    public static associations: {
    };
}

//모델 생성
Banner.init(
    {
        bannerTitle: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        bannerImage: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        bannerTag: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        modelName: 'Banner',
        tableName: 'banner',
        sequelize,
        freezeTableName: true,
        timestamps:false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);