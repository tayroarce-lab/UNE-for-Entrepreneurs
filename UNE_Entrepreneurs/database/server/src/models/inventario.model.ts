import { Model, DataTypes, Sequelize } from 'sequelize';

export interface InventarioAttributes {
  id?: number;
  id_usuario: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  stock_minimo: number;
  unidad: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Inventario extends Model<InventarioAttributes> implements InventarioAttributes {
  public id!: number;
  public id_usuario!: number;
  public nombre!: string;
  public categoria!: string;
  public precio!: number;
  public stock!: number;
  public stock_minimo!: number;
  public unidad!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    Inventario.init(
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
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        categoria: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        precio: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        stock_minimo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        unidad: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'Unidades',
        },
      },
      {
        sequelize,
        tableName: 'inventario',
      }
    );
  }
}
export default Inventario;
