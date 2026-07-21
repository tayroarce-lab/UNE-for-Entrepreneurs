import { Request, Response } from 'express';
import { Transaccion } from '../models/transaccion.model';

export class TransaccionController {
  private static mapToClient(item: any) {
    const data = item.toJSON ? item.toJSON() : item;
    return {
      id: data.id,
      userId: data.id_usuario,
      description: data.descripcion,
      amount: Number(data.monto),
      type: data.tipo,
      category: data.categoria,
      date: data.fecha,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  }

  private static mapToDB(body: any) {
    const dbData: any = {};
    if (body.userId !== undefined) dbData.id_usuario = body.userId;
    if (body.description !== undefined) dbData.descripcion = body.description;
    if (body.amount !== undefined) dbData.monto = body.amount;
    if (body.type !== undefined) dbData.tipo = body.type;
    if (body.category !== undefined) dbData.categoria = body.category;
    if (body.date !== undefined) dbData.fecha = body.date;
    return dbData;
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const { _sort, _order, userId } = req.query;
      const order: any[] = [];
      if (_sort) {
        let sortField = _sort as string;
        if (sortField === 'date') sortField = 'fecha'; // Map legacy date to fecha
        order.push([sortField, _order === 'desc' ? 'DESC' : 'ASC']);
      }
      
      const where: any = {};
      if (userId) {
        where['id_usuario'] = userId; 
      }

      const items = await Transaccion.findAll({ order, where });
      return res.status(200).json(items.map(item => TransaccionController.mapToClient(item)));
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const item = await Transaccion.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      return res.status(200).json(TransaccionController.mapToClient(item));
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const item = await Transaccion.create(TransaccionController.mapToDB(req.body));
      return res.status(201).json(TransaccionController.mapToClient(item));
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const item = await Transaccion.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.update(TransaccionController.mapToDB(req.body));
      return res.status(200).json(TransaccionController.mapToClient(item));
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const item = await Transaccion.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.destroy();
      return res.status(200).json({});
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
export default TransaccionController;