import { Request, Response } from 'express';
import { SolicitudContacto } from '../models/solicitudContacto.model';

export class SolicitudContactoController {
  public static async getAll(req: Request, res: Response) {
    try {
      const { _sort, _order, userId } = req.query;
      const order: any[] = [];
      if (_sort) {
        order.push([_sort as string, _order === 'desc' ? 'DESC' : 'ASC']);
      }
      
      const where: any = {};
      if (userId) {
        where['id_usuario'] = userId;
      }

      const items = await SolicitudContacto.findAll({ order, where });
      return res.status(200).json(items);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const item = await SolicitudContacto.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      return res.status(200).json(item);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const item = await SolicitudContacto.create(req.body);
      return res.status(201).json(item);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const item = await SolicitudContacto.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.update(req.body);
      return res.status(200).json(item);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const item = await SolicitudContacto.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.destroy();
      return res.status(200).json({});
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
export default SolicitudContactoController;