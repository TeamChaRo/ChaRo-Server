import {
    DataTypes, 
    Model, 
} from 'sequelize';
import {sequelize} from "../Loaders/db"

// user 모델의 구성요소를 명시
interface UserAttributes {
    userId: string;
    password: string;
    email: string;
    nickname: string;
    profileImage: string;
    pushAlarm: number;
};

export default class User extends Model<UserAttributes> {
    //조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
    public userId!: string;
    public password!: string;
    public email!: string;
    public nickname!: string;
    public profileImage!: string;
    public pushAlarm!: boolean;

    public static associations: {
    };
}

//모델 생성
User.init(
    {
        userId: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        profileImage: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        pushAlarm: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        modelName: 'User',
        tableName: 'user',
        sequelize,
        freezeTableName: true
    }
);