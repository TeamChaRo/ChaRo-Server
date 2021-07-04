import {
    DataTypes, 
    Model, 
} from 'sequelize';
import {sequelize} from "../Loaders/db"

interface ThemeAttributes {
    themeId?: number;
    themeName: string;
};

export default class Theme extends Model<ThemeAttributes> {
    //조회 후 사용 되어질 요소들의 타입명시 설정이 되어 있지 않으면 조회시 또는 조회 후 데이터 타입체크에서 오류
    public readonly themeId!: number; 
    public themeName!: string;

    public static associations: {
    };
}

Theme.init(
    {
        themeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, //AUTO_INCREMENT로 지덩된 열은 INSERT문에서 NULL값을 지정하면 자동으로 값이 입력됨. 반드시 PK로 설정해야함.
            allowNull: false
        },
        themeName: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
    },
    {
        modelName: 'Theme',
        tableName: 'theme',
        sequelize,
        freezeTableName: true,
        timestamps:false
    }
);