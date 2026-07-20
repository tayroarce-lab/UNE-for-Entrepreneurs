import { Model, DataTypes, Sequelize } from 'sequelize';

export interface EmpresaProyectoAttributes {
  id?: number;
  id_propietario: number;
  nombre: string;
  descripcion?: string;
  sector?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class EmpresaProyecto extends Model<EmpresaProyectoAttributes> implements EmpresaProyectoAttributes {
  public id!: number;
  public id_propietario!: number;
  public nombre!: string;
  public descripcion?: string;
  public sector?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    EmpresaProyecto.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        id_propietario: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'usuarios',
            key: 'id',
          },
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descripcion: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        sector: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'empresa_proyectos',
      }
    );
  }
}
export default EmpresaProyecto;
