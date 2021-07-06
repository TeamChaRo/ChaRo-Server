import {
    DataTypes, 
    Model
} from 'sequelize';
import {sequelize} from "../Loaders/db"

interface PostAttributes {
    id?: number;
    //userId?: string;
    //date?: Date; //timestamp :true 옵션 믿어보기
    title?: string;
    province?: string;
    city?: string;
    isParking?: boolean;
    parkingDesc?: string;
    courseDesc?: string;
};

export default class Post extends Model<PostAttributes> {
    //조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
    public id!: number;
    //public userId!: string;
    //public date!: Date;
    public title!: string;
    public province!: string;
    public city!: string;
    public isParking!: boolean;
    public parkingDesc!: string;
    public courseDesc!: string;

    public static associations: {
    };
}

Post.init(
    {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, //AUTO_INCREMENT로 지덩된 열은 INSERT문에서 NULL값을 지정하면 자동으로 값이 입력됨. 반드시 PK로 설정해야함.
            allowNull: false
        },
        title : {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        province: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        isParking: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        parkingDesc: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        courseDesc: {
            type: DataTypes.STRING(280),
            allowNull: true
        }
        
    },
    {
        modelName: 'Post',
        tableName: 'post',
        sequelize,
        freezeTableName: true,
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
)
