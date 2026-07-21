import { EmpresaProyecto, EmpresaProyectoAttributes, HitoMeta } from '../models';

export class EmpresaService {
  public static async create(data: EmpresaProyectoAttributes): Promise<EmpresaProyecto> {
    return await EmpresaProyecto.create(data);
  }

  public static async findByOwner(userId: number): Promise<EmpresaProyecto[]> {
    return await EmpresaProyecto.findAll({
      where: { id_propietario: userId },
      include: [{ model: HitoMeta, as: 'hitos' }],
    });
  }

  public static async findById(id: number): Promise<EmpresaProyecto | null> {
    return await EmpresaProyecto.findByPk(id, {
      include: [{ model: HitoMeta, as: 'hitos' }],
    });
  }

  public static async update(id: number, userId: number, data: Partial<EmpresaProyectoAttributes>): Promise<EmpresaProyecto> {
    const proyecto = await EmpresaProyecto.findByPk(id);
    if (!proyecto) {
      throw new Error('Proyecto no encontrado.');
    }
    if (proyecto.id_propietario !== userId) {
      throw new Error('No tienes permiso para actualizar este proyecto.');
    }

    return await proyecto.update(data);
  }

  public static async delete(id: number, userId: number): Promise<void> {
    const proyecto = await EmpresaProyecto.findByPk(id);
    if (!proyecto) {
      throw new Error('Proyecto no encontrado.');
    }
    if (proyecto.id_propietario !== userId) {
      throw new Error('No tienes permiso para eliminar este proyecto.');
    }

    await proyecto.destroy();
  }
}
export default EmpresaService;
