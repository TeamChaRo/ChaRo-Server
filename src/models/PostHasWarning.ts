import {
    DataTypes, 
    Model,
} from 'sequelize';
import {sequelize} from "../Loaders/db";

interface PHWAttributes {
    postId?: number;
    warning1?: string;
    warning2?: string;
    warning3?: string;
    warning4?: string;
};

export default class PostHasWarning extends Model<PHWAttributes> {
    public postId!: Number;
    public warning1!: string;
    public warning2!: string;
    public warning3!: string;
    public warning4!: string;

    public static associations: {
    };
}

PostHasWarning.init(
    {   
        postId : {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        warning1: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        warning2: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        warning3: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        warning4: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
    },
    {
        modelName: 'PostHasWarning',
        tableName: 'post_has_warning',
        sequelize,
        freezeTableName: true,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);