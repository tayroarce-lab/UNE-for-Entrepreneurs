const fs = require('fs');
const path = require('path');

const models = [
  { name: 'Noticia', routePath: 'news', modelFile: 'noticia.model' },
  { name: 'Transaccion', routePath: 'transactions', modelFile: 'transaccion.model' },
  { name: 'Inventario', routePath: 'inventario', modelFile: 'inventario.model' },
  { name: 'CasoExito', routePath: 'casosDeExito', modelFile: 'casoExito.model' },
  { name: 'SolicitudContacto', routePath: 'solicitudesContacto', modelFile: 'solicitudContacto.model' },
  { name: 'Recurso', routePath: 'recursos', modelFile: 'recurso.model' }
];

const controllersDir = path.join(__dirname, 'src', 'controllers');
const routesDir = path.join(__dirname, 'src', 'routes');

if (!fs.existsSync(controllersDir)) fs.mkdirSync(controllersDir, { recursive: true });
if (!fs.existsSync(routesDir)) fs.mkdirSync(routesDir, { recursive: true });

models.forEach(model => {
  const controllerName = `${model.routePath}.controller.ts`;
  const routeName = `${model.routePath}.routes.ts`;

  const controllerContent = `
import { Request, Response } from 'express';
import { ${model.name} } from '../models/${model.modelFile}';

export class ${model.name}Controller {
  public static async getAll(req: Request, res: Response) {
    try {
      const { _sort, _order, userId } = req.query;
      const order: any[] = [];
      if (_sort) {
        order.push([_sort as string, _order === 'desc' ? 'DESC' : 'ASC']);
      }
      
      const where: any = {};
      if (userId) {
        if ('${model.name}' === 'Transaccion') {
            where['id_usuario'] = userId; 
        } else if ('${model.name}' === 'Noticia') {
            where['id_autor'] = userId;
        }
      }

      const items = await ${model.name}.findAll({ order, where });
      return res.status(200).json(items);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const item = await ${model.name}.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      return res.status(200).json(item);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const item = await ${model.name}.create(req.body);
      return res.status(201).json(item);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const item = await ${model.name}.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.update(req.body);
      return res.status(200).json(item);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const item = await ${model.name}.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'No encontrado' });
      await item.destroy();
      return res.status(200).json({});
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
export default ${model.name}Controller;
  `.trim();

  const routeContent = `
import { Router } from 'express';
import { ${model.name}Controller } from '../controllers/${model.routePath}.controller';

const router = Router();

router.get('/', ${model.name}Controller.getAll);
router.get('/:id', ${model.name}Controller.getById);
router.post('/', ${model.name}Controller.create);
router.patch('/:id', ${model.name}Controller.update);
router.delete('/:id', ${model.name}Controller.delete);

export default router;
  `.trim();

  fs.writeFileSync(path.join(controllersDir, controllerName), controllerContent);
  fs.writeFileSync(path.join(routesDir, routeName), routeContent);
});

console.log('Controllers and routes generated successfully.');
