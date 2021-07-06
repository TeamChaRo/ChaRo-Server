import {
    DataTypes, 
    Model, 
} from 'sequelize';
import {sequelize} from "../Loaders/db"

interface CustomAttributes {
    customTitle?: string,
    customTheme?: string,
};

export default class Custom extends Model<CustomAttributes> {

    public customTitle!: string;
    public customTheme!: string;

    public static associations: {
    };
}

//모델 생성
Custom.init(
    {
        customTitle: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        customTheme: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        modelName: 'Custom',
        tableName: 'custom',
        sequelize,
        freezeTableName: true,
        timestamps:false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);