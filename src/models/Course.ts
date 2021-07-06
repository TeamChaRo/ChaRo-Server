import {
    DataTypes, 
    Model,
} from 'sequelize';
import {sequelize} from "../Loaders/db";

interface CourseAttributes {
    source?: string;
    wayPoint1?: string;
    wayPoint2?: string;
    longtitude1?: string;
    latitude1?: string;
    longtitude2?: string;
    latitude2?: string;
    destination?: string;
};

export default class Course extends Model<CourseAttributes> {
    //조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
    public source!: string;

    public wayPoint1!: string; 
    public longtitude1!: string; 
    public latitude1!: string;
    
    public wayPoint2!: string; 
    public longtitude2!: string; 
    public latitude2!: string;
    
    public destination!: string;

    public static associations: {
    };
}

Course.init(
    {   
        source: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        wayPoint1: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        longtitude1: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        latitude1: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        wayPoint2: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        longtitude2: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        latitude2: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        destination: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    },
    {
        modelName: 'Course',
        tableName: 'course',
        sequelize,
        freezeTableName: true,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);