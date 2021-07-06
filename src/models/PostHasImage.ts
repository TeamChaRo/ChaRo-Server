import {
    DataTypes, 
    Model,
} from 'sequelize';
import {sequelize} from "../Loaders/db";

interface PHIAttributes {
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
    image5?: string;
    image6?: string;
};

export default class PostHasImage extends Model<PHIAttributes> {
    //조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
    public image1!: string;
    public image2!: string;
    public image3!: string;
    public image4!: string;
    public image5!: string;
    public image6!: string;

    public static associations: {
    };
}


PostHasImage.init(
    {   
        image1: {
            type: DataTypes.STRING(80),
            defaultValue: "*"
        },
        image2: {
            type: DataTypes.STRING(80),
            defaultValue: "*"
        },
        image3: {
            type: DataTypes.STRING(80),
            defaultValue: "*"
        },
        image4: {
            type: DataTypes.STRING(80),
            defaultValue: "*"
        },
        image5: {
            type: DataTypes.STRING(80),
            defaultValue: "*"
        },
        image6: {
            type: DataTypes.STRING(80),
            defaultValue: "*"
        },
    },
    {
        modelName: 'PostHasImage',
        tableName: 'post_has_image',
        sequelize,
        freezeTableName: true,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);
