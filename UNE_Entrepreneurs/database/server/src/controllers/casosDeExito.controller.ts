import { Request, Response } from 'express';
import { CasoExito } from '../models/casoExito.model';

export class CasoExitoController {
  private static mapToClient(item: any) {
    const data = item.toJSON ? item.toJSON() : item;
    return {
      ...data,
      colorTag: data.color_tag !== undefined ? data.color_tag : data.colorTag,
    };
  }

  private static mapToDB(body: any) {
    const dbData: any = { ...body };
    if (body.colorTag !== undefined) {
      dbData.color_tag = body.colorTag;
      delete dbData.colorTag;
    }
    return dbData;
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const { _sort, _order } = req.query;
      const order: any[] = [];
      if (_sort) {
        let sortField = _sort as string;
        if (sortField === 'colorTag') sortField = 'color_tag';
        order.push([sortField, _order === 'desc' ? 'DESC' : 'ASC']);
      }

      const items = await CasoExito.findAll({ order });
      return res.status(200).json(items.map(item => CasoExitoController.mapToClient(item)));
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const item = await CasoExito.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      return res.status(200).json(CasoExitoController.mapToClient(item));
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const item = await CasoExito.create(CasoExitoController.mapToDB(req.body));
      return res.status(201).json(CasoExitoController.mapToClient(item));
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const item = await CasoExito.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.update(CasoExitoController.mapToDB(req.body));
      return res.status(200).json(CasoExitoController.mapToClient(item));
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const item = await CasoExito.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.destroy();
      return res.status(200).json({});
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
export default CasoExitoController;