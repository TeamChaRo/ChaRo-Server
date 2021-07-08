import {
    DataTypes, 
    Model,
} from 'sequelize';
import {sequelize} from "../Loaders/db";

interface CourseAttributes {
    src?: string;
    srcLongitude?: string;
    srcLatitude?: string;
    wayOne?: string;
    wayOneLongitude?: string;
    wayOneLatitude?: string;
    wayTwo?: string;
    wayTwoLongitude?: string;
    wayTwoLatitude?: string;
    dest?: string;
    destLongitude?: string;
    destLatitude?: string;
};

export default class Course extends Model<CourseAttributes> {
    //조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
    public src!: string;
    public srcLongitude!: string;
    public srcLatitude!: string;

    public wayOne!: string; 
    public wayOneLongitude!: string; 
    public wayOneLatitude!: string;
    
    public wayTwo!: string; 
    public wayTwoLongitude!: string; 
    public wayTwoLatitude!: string;
    
    public dest!: string;
    public destLongitude!: string;
    public destLatitude!: string;

    public static associations: {
    };
}

Course.init(
    {   
        src: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        srcLongitude: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        srcLatitude: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        wayOne: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        wayOneLongitude: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        wayOneLatitude: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        wayTwo: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        wayTwoLongitude: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        wayTwoLatitude: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        dest: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        destLongitude: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        destLatitude: {
            type: DataTypes.STRING(20),
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