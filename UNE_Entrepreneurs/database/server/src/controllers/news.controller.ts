import { Request, Response } from 'express';
import { Noticia } from '../models/noticia.model';
import { User } from '../models/user.model';

export class NoticiaController {
  private static mapToClient(item: any) {
    const data = item.toJSON ? item.toJSON() : item;
    return {
      id: data.id,
      titulo: data.titulo,
      contenido: data.contenido,
      imagen: data.imagen,
      autor: data.autor ? data.autor.nombre : data.id_autor?.toString(),
      id_autor: data.id_autor,
      activa: data.activa,
      fecha: data.fecha,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  }

  private static mapToDB(body: any) {
    const dbData: any = {};
    if (body.titulo !== undefined) dbData.titulo = body.titulo;
    if (body.contenido !== undefined) dbData.contenido = body.contenido;
    if (body.imagen !== undefined) dbData.imagen = body.imagen;
    if (body.autor !== undefined && !isNaN(Number(body.autor))) dbData.id_autor = Number(body.autor);
    if (body.id_autor !== undefined) dbData.id_autor = body.id_autor;
    if (body.activa !== undefined) dbData.activa = body.activa;
    if (body.fecha !== undefined) dbData.fecha = body.fecha;
    return dbData;
  }

  public static async getAll(req: Request, res: Response) {
    try {
      const { _sort, _order, userId } = req.query;
      const order: any[] = [];
      if (_sort) {
        order.push([_sort as string, _order === 'desc' ? 'DESC' : 'ASC']);
      }
      
      const where: any = {};
      if (userId) {
        where['id_autor'] = userId;
      }

      const items = await Noticia.findAll({ 
        order, 
        where,
        include: [{ model: User, as: 'autor', attributes: ['nombre'] }]
      });
      return res.status(200).json(items.map(item => NoticiaController.mapToClient(item)));
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const item = await Noticia.findByPk(req.params.id, {
        include: [{ model: User, as: 'autor', attributes: ['nombre'] }]
      });
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      return res.status(200).json(NoticiaController.mapToClient(item));
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const item = await Noticia.create(NoticiaController.mapToDB(req.body));
      
      // Reload to get the author name
      const reloadedItem = await Noticia.findByPk(item.id, {
        include: [{ model: User, as: 'autor', attributes: ['nombre'] }]
      });
      
      return res.status(201).json(NoticiaController.mapToClient(reloadedItem || item));
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const item = await Noticia.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      
      await item.update(NoticiaController.mapToDB(req.body));
      
      const reloadedItem = await Noticia.findByPk(item.id, {
        include: [{ model: User, as: 'autor', attributes: ['nombre'] }]
      });
      
      return res.status(200).json(NoticiaController.mapToClient(reloadedItem || item));
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const item = await Noticia.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.destroy();
      return res.status(200).json({});
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
export default NoticiaController;