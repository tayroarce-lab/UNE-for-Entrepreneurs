import { Model, DataTypes, Sequelize } from 'sequelize';

export interface TransaccionAttributes {
  id?: number;
  id_usuario: number;
  descripcion: string;
  monto: number;
  tipo: 'income' | 'expense' | 'investment';
  categoria: string;
  fecha: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Transaccion extends Model<TransaccionAttributes> implements TransaccionAttributes {
  public id!: number;
  public id_usuario!: number;
  public descripcion!: string;
  public monto!: number;
  public tipo!: 'income' | 'expense' | 'investment';
  public categoria!: string;
  public fecha!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    Transaccion.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        id_usuario: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'usuarios',
            key: 'id',
          },
        },
        descripcion: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        monto: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        tipo: {
          type: DataTypes.ENUM('income', 'expense', 'investment'),
          allowNull: false,
        },
        categoria: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fecha: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'transacciones',
      }
    );
  }
}
export default Transaccion;
