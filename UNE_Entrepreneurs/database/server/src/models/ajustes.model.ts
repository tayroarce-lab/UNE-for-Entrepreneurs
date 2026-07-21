import { Model, DataTypes, Sequelize } from 'sequelize';

export interface AjusteSistemaAttributes {
  id?: number;
  une_loan_max: number;
  commission: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AjusteSistema extends Model<AjusteSistemaAttributes> implements AjusteSistemaAttributes {
  public id!: number;
  public une_loan_max!: number;
  public commission!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    AjusteSistema.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        une_loan_max: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
          defaultValue: 500000.00,
        },
        commission: {
          type: DataTypes.DECIMAL(5, 4),
          allowNull: false,
          defaultValue: 0.0100,
        },
      },
      {
        sequelize,
        tableName: 'ajustes_sistema',
      }
    );
  }
}
export default AjusteSistema;
