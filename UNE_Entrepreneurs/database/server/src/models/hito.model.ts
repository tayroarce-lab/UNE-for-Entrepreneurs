import { Model, DataTypes, Sequelize } from 'sequelize';

export interface HitoMetaAttributes {
  id?: number;
  id_proyecto: number;
  titulo: string;
  estado: 'pendiente' | 'en_progreso' | 'completado';
  createdAt?: Date;
  updatedAt?: Date;
}

export class HitoMeta extends Model<HitoMetaAttributes> implements HitoMetaAttributes {
  public id!: number;
  public id_proyecto!: number;
  public titulo!: string;
  public estado!: 'pendiente' | 'en_progreso' | 'completado';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    HitoMeta.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        id_proyecto: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'empresa_proyectos',
            key: 'id',
          },
        },
        titulo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        estado: {
          type: DataTypes.ENUM('pendiente', 'en_progreso', 'completado'),
          allowNull: false,
          defaultValue: 'pendiente',
        },
      },
      {
        sequelize,
        tableName: 'hito_metas',
      }
    );
  }
}
export default HitoMeta;
