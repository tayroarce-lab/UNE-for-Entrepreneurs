import { Request, Response } from 'express';
import { SolicitudContacto } from '../models/solicitudContacto.model';

export class SolicitudContactoController {
  private static mapToClient(item: any) {
    const data = item.toJSON ? item.toJSON() : item;
    let estadoMapped = data.estado;
    if (estadoMapped === 'Rechazado') estadoMapped = 'Descartado';
    return {
      ...data,
      fechaRegistro: data.fecha_registro || data.fechaRegistro,
      estado: estadoMapped,
    };
  }

  private static mapToDB(body: any) {
    const dbData: any = { ...body };
    if (body.fechaRegistro !== undefined) {
      dbData.fecha_registro = body.fechaRegistro;
      delete dbData.fechaRegistro;
    }
    if (body.estado !== undefined) {
      if (body.estado === 'Descartado') {
        dbData.estado = 'Rechazado';
      }
    }
    return dbData;
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const { _sort, _order } = req.query;
      const order: any[] = [];
      if (_sort) {
        let sortField = _sort as string;
        if (sortField === 'fechaRegistro') sortField = 'fecha_registro';
        order.push([sortField, _order === 'desc' ? 'DESC' : 'ASC']);
      }

      const items = await SolicitudContacto.findAll({ order });
      return res.status(200).json(items.map(item => SolicitudContactoController.mapToClient(item)));
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const item = await SolicitudContacto.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      return res.status(200).json(SolicitudContactoController.mapToClient(item));
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const item = await SolicitudContacto.create(SolicitudContactoController.mapToDB(req.body));
      return res.status(201).json(SolicitudContactoController.mapToClient(item));
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const item = await SolicitudContacto.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.update(SolicitudContactoController.mapToDB(req.body));
      return res.status(200).json(SolicitudContactoController.mapToClient(item));
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