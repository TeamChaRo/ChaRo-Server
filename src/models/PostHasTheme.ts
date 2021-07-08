import {
    DataTypes, 
    Model,
} from 'sequelize';
import {sequelize} from "../Loaders/db";

interface PHTAttributes {
    postId?: number;
    theme1?: string;
    theme2?: string;
    theme3?: string;
};

export default class PostHasTheme extends Model<PHTAttributes> {
    public postId!: number;
    public theme1!: string;
    public theme2!: string;
    public theme3!: string;
    public static associations: {
    };
}


PostHasTheme.init(
    {   
        postId : {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        theme1: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        theme2: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        theme3: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
    },
    {
        modelName: 'PostHasTheme',
        tableName: 'post_has_theme',
        sequelize,
        freezeTableName: true,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);
