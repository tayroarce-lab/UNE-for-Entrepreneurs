import { Model, DataTypes, Sequelize } from 'sequelize';

export interface CasoExitoAttributes {
  id?: number;
  nombre: string;
  profesion: string;
  ubicacion: string;
  cita: string;
  imagen?: string;
  color_tag?: string;
  activo: boolean;
  fecha: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CasoExito extends Model<CasoExitoAttributes> implements CasoExitoAttributes {
  public id!: number;
  public nombre!: string;
  public profesion!: string;
  public ubicacion!: string;
  public cita!: string;
  public imagen?: string;
  public color_tag?: string;
  public activo!: boolean;
  public fecha!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    CasoExito.init(
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
        profesion: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ubicacion: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cita: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        imagen: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        color_tag: {
          type: DataTypes.STRING(7),
          allowNull: true,
        },
        activo: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        fecha: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'casos_de_exito',
      }
    );
  }
}
export default CasoExito;
