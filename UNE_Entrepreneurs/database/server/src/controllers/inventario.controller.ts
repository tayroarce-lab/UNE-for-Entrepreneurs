import { Request, Response } from 'express';
import { Inventario } from '../models/inventario.model';

export class InventarioController {
  private static mapToClient(item: any) {
    const data = item.toJSON ? item.toJSON() : item;
    return {
      id: data.id,
      userId: data.id_usuario,
      nombre: data.nombre,
      categoria: data.categoria,
      precio: Number(data.precio),
      stock: data.stock,
      stockMinimo: data.stock_minimo,
      unidad: data.unidad,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  }

  private static mapToDB(body: any) {
    const dbData: any = {};
    if (body.userId !== undefined) dbData.id_usuario = body.userId;
    if (body.nombre !== undefined) dbData.nombre = body.nombre;
    if (body.categoria !== undefined) dbData.categoria = body.categoria;
    if (body.precio !== undefined) dbData.precio = body.precio;
    if (body.stock !== undefined) dbData.stock = body.stock;
    if (body.stockMinimo !== undefined) dbData.stock_minimo = body.stockMinimo;
    if (body.unidad !== undefined) dbData.unidad = body.unidad;
    return dbData;
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const { _sort, _order, userId } = req.query;
      const order: any[] = [];
      if (_sort) {
        let sortField = _sort as string;
        if (sortField === 'stockMinimo') sortField = 'stock_minimo';
        if (sortField === 'userId') sortField = 'id_usuario';
        order.push([sortField, _order === 'desc' ? 'DESC' : 'ASC']);
      }
      
      const where: any = {};
      if (userId) {
        where['id_usuario'] = userId;
      }

      const items = await Inventario.findAll({ order, where });
      return res.status(200).json(items.map(item => InventarioController.mapToClient(item)));
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const item = await Inventario.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      return res.status(200).json(InventarioController.mapToClient(item));
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const item = await Inventario.create(InventarioController.mapToDB(req.body));
      return res.status(201).json(InventarioController.mapToClient(item));
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const item = await Inventario.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.update(InventarioController.mapToDB(req.body));
      return res.status(200).json(InventarioController.mapToClient(item));
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const item = await Inventario.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.destroy();
      return res.status(200).json({});
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
export default InventarioController;