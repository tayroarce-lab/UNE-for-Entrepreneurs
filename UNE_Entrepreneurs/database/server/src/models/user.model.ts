import { Model, DataTypes, Sequelize } from 'sequelize';

export interface UserAttributes {
  id?: number;
  nombre: string;
  email: string;
  password?: string;
  rol: 'admin' | 'emprendedor' | 'mentor';
  url_foto_perfil?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public declare id: number;
  public declare nombre: string;
  public declare email: string;
  public declare password: string;
  public declare rol: 'admin' | 'emprendedor' | 'mentor';
  public declare url_foto_perfil?: string;

  public declare readonly createdAt: Date;
  public declare readonly updatedAt: Date;

  public static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        rol: {
          type: DataTypes.ENUM('admin', 'emprendedor', 'mentor'),
          allowNull: false,
          defaultValue: 'emprendedor',
        },
        url_foto_perfil: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'usuarios',
      }
    );
  }
}
export default User;
