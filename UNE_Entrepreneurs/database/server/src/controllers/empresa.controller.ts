import { Response } from 'express';
import EmpresaService from '../services/empresa.service';
import { AuthenticatedRequest } from '../middlewares/autenticacion.middleware';

export class EmpresaController {
  public static async create(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ mensaje: 'No autorizado.' });
      }

      const { nombre, descripcion, sector } = req.body;
      const nuevoProyecto = await EmpresaService.create({
        id_propietario: req.user.id,
        nombre,
        descripcion,
        sector,
      });

      return res.status(201).json({
        mensaje: 'Proyecto de empresa creado con éxito.',
        datos: nuevoProyecto,
      });
    } catch (error: any) {
      return res.status(400).json({ mensaje: error.message || 'Error al crear el proyecto.' });
    }
  }

  public static async listMyProjects(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ mensaje: 'No autorizado.' });
      }

      const proyectos = await EmpresaService.findByOwner(req.user.id);
      return res.status(200).json({ datos: proyectos });
    } catch (error: any) {
      return res.status(500).json({ mensaje: 'Error al listar los proyectos.' });
    }
  }

  public static async getProjectDetails(req: AuthenticatedRequest, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const proyecto = await EmpresaService.findById(id);

      if (!proyecto) {
        return res.status(404).json({ mensaje: 'Proyecto no encontrado.' });
      }

      if (req.user && req.user.rol !== 'admin' && req.user.rol !== 'mentor' && proyecto.id_propietario !== req.user.id) {
        return res.status(403).json({ mensaje: 'Acceso denegado a este proyecto.' });
      }

      return res.status(200).json({ datos: proyecto });
    } catch (error: any) {
      return res.status(500).json({ mensaje: 'Error al obtener detalles del proyecto.' });
    }
  }

  public static async update(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ mensaje: 'No autorizado.' });
      }

      const id = parseInt(req.params.id, 10);
      const { nombre, descripcion, sector } = req.body;

      const proyectoActualizado = await EmpresaService.update(id, req.user.id, {
        nombre,
        descripcion,
        sector,
      });

      return res.status(200).json({
        mensaje: 'Proyecto actualizado con éxito.',
        datos: proyectoActualizado,
      });
    } catch (error: any) {
      return res.status(400).json({ mensaje: error.message || 'Error al actualizar el proyecto.' });
    }
  }

  public static async delete(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ mensaje: 'No autorizado.' });
      }

      const id = parseInt(req.params.id, 10);
      await EmpresaService.delete(id, req.user.id);

      return res.status(200).json({
        mensaje: 'Proyecto eliminado con éxito.',
      });
    } catch (error: any) {
      return res.status(400).json({ mensaje: error.message || 'Error al eliminar el proyecto.' });
    }
  }
}
export default EmpresaController;
