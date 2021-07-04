import {
    DataTypes, 
    Model,
    Sequelize
} from 'sequelize';
import {sequelize} from "../Loaders/db";

interface CourseAttributes {
    source?: string;
    wayPoint?: string;
    destination?: string;
};

export default class Course extends Model<CourseAttributes> {
    //조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
    public source!: string;
    public wayPoint!: string;  
    public destination!: string;

    public static associations: {
    };
}

Course.init(
    {   
        source: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        wayPoint: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        destination: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
    },
    {
        modelName: 'Course',
        tableName: 'course',
        sequelize,
        freezeTableName: true,
        timestamps: false
    }
);