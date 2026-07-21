import { Model, DataTypes, Sequelize } from 'sequelize';

export interface SolicitudContactoAttributes {
  id?: number;
  nombre: string;
  telefono?: string;
  email: string;
  ubicacion?: string;
  negocio?: string;
  mensaje?: string;
  fecha_registro: Date;
  estado: 'Pendiente' | 'Contactado' | 'Rechazado';
  createdAt?: Date;
  updatedAt?: Date;
}

export class SolicitudContacto extends Model<SolicitudContactoAttributes> implements SolicitudContactoAttributes {
  public id!: number;
  public nombre!: string;
  public telefono?: string;
  public email!: string;
  public ubicacion?: string;
  public negocio?: string;
  public mensaje?: string;
  public fecha_registro!: Date;
  public estado!: 'Pendiente' | 'Contactado' | 'Rechazado';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    SolicitudContacto.init(
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
        telefono: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        ubicacion: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        negocio: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        mensaje: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        fecha_registro: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        estado: {
          type: DataTypes.ENUM('Pendiente', 'Contactado', 'Rechazado'),
          allowNull: false,
          defaultValue: 'Pendiente',
        },
      },
      {
        sequelize,
        tableName: 'solicitudes_contacto',
      }
    );
  }
}
export default SolicitudContacto;
