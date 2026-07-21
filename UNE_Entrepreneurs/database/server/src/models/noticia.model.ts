import { Model, DataTypes, Sequelize } from 'sequelize';

export interface NoticiaAttributes {
  id?: number;
  titulo: string;
  contenido: string;
  imagen?: string;
  id_autor: number;
  activa: boolean;
  fecha: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Noticia extends Model<NoticiaAttributes> implements NoticiaAttributes {
  public id!: number;
  public titulo!: string;
  public contenido!: string;
  public imagen?: string;
  public id_autor!: number;
  public activa!: boolean;
  public fecha!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    Noticia.init(
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
        contenido: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        imagen: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        id_autor: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'usuarios',
            key: 'id',
          },
        },
        activa: {
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
        tableName: 'noticias',
      }
    );
  }
}
export default Noticia;
