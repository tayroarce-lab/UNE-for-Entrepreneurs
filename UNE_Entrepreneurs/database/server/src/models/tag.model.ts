import { Model, DataTypes, Sequelize } from 'sequelize';

export interface TagAttributes {
  id?: number;
  nombre: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Tag extends Model<TagAttributes> implements TagAttributes {
  public id!: number;
  public nombre!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    Tag.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: 'tags',
      }
    );
  }
}
export default Tag;
