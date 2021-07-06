import {
    DataTypes, 
    Model,
} from 'sequelize';
import {sequelize} from "../Loaders/db"

interface SHAttributes {
    userId?: string;
    keyword?: string;
    longtitude?: string;
    latitude?: string;
};

export default class SearchHistory extends Model<SHAttributes> {
    public userId!: string;
    public keyword!: string;
    public longtitude!: string;
    public latitude!: boolean;
    public static associations: {
    };
}

SearchHistory.init(
    {
        userId : {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false
        },
        keyword: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        longtitude: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        latitude: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
    },
    {
        modelName: 'SearchHistory',
        tableName: 'search_history',
        sequelize,
        freezeTableName: true,
        timestamps:true
    }
);