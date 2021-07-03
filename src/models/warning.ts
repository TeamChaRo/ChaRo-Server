import {
    DataTypes, 
    Model, 
} from 'sequelize';
import {sequelize} from "../Loaders/db"

interface WarningAttributes {
    warningId?: number;
    warningName: string;
};

export default class Warning extends Model<WarningAttributes> {
    //조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
    public readonly warningId!: number; //readonly -> 읽기전용? 테이블 조회시 데이터를 수정못한다는 의미인가? 어떤 의미인거지?
    public warningName!: string;

    public static associations: {
    };
}

//모델 생성
Warning.init(
    {
        warningId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        warningName: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
    },
    {
        modelName: 'Warning',
        tableName: 'warning',
        sequelize,
        freezeTableName: true
    }
);