import {
    DataTypes, 
    Model,
} from 'sequelize';
import {sequelize} from "../Loaders/db";

interface PHTAttributes {
    theme1?: number;
    theme2?: number;
    theme3?: number;
    
};

export default class PostHasImage extends Model<PHTAttributes> {
    //조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
    public theme1!: string;
    public theme2!: string;
    public theme3!: string;
    public static associations: {
    };
}


PostHasImage.init(
    {   
        theme1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        theme2: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        theme3: {
            type: DataTypes.INTEGER,
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
