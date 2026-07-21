import { Router } from 'express';
import { InventarioController } from '../controllers/inventario.controller';

const router = Router();

router.get('/', InventarioController.getAll);
router.get('/:id', InventarioController.getById);
router.post('/', InventarioController.create);
router.patch('/:id', InventarioController.update);
router.delete('/:id', InventarioController.delete);

export default router;