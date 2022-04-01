import {sequelize} from '.';
import { DataTypes, Model } from 'sequelize';
import { User } from '../../domain/user';

interface UserInstance extends Model<User>{};

const UserModel = sequelize.define<UserInstance>('user',{
        id: {
            type : DataTypes.BIGINT,
            allowNull : false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique : true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        surnames: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(80),
            allowNull: false,
            unique : true
        }
});


export default UserModel;