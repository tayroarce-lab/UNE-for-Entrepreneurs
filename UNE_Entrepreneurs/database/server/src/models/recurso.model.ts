import { Model, DataTypes, Sequelize } from 'sequelize';

export interface ContenidoRecursoAttributes {
  id?: number;
  titulo: string;
  descripcion?: string;
  tipo: string;
  enlace: string;
  imagen?: string;
  activo: boolean;
  fecha: Date;
  id_autor: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ContenidoRecurso extends Model<ContenidoRecursoAttributes> implements ContenidoRecursoAttributes {
  public id!: number;
  public titulo!: string;
  public descripcion?: string;
  public tipo!: string;
  public enlace!: string;
  public imagen?: string;
  public activo!: boolean;
  public fecha!: Date;
  public id_autor!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    ContenidoRecurso.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        titulo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descripcion: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        tipo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        enlace: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        imagen: {
          type: DataTypes.STRING,
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
        id_autor: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'usuarios',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'contenido_recursos',
      }
    );
  }
}
export default ContenidoRecurso;
