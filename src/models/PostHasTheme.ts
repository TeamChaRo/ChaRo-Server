import {
    DataTypes, 
    Model,
} from 'sequelize';
import {sequelize} from "../Loaders/db";

interface PHTAttributes {
    postId?: number;
    themeName?: string;
};

export default class PostHasTheme extends Model<PHTAttributes> {
    public postId!: number;
    public themeName!: string;
    public static associations: {
    };
}


PostHasTheme.init(
    {   
        postId : {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        themeName: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        
    },
    {
        modelName: 'PostHasTheme',
        tableName: 'post_has_theme',
        sequelize,
        freezeTableName: true,
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);
