import {
    DataTypes, 
    Model,
} from 'sequelize';
import {sequelize} from "../Loaders/db";

interface PHWAttributes {
    postId?: number;
    warningName?: string;
};

export default class PostHasWarning extends Model<PHWAttributes> {
    public postId!: Number;
    public warningName!: string;

    public static associations: {
    };
}

PostHasWarning.init(
    {   
        postId : {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        warningName: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false
        }
    },
    {
        modelName: 'PostHasWarning',
        tableName: 'post_has_warning',
        sequelize,
        freezeTableName: true,
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);