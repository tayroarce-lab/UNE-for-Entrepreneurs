import { Router } from 'express';
import { RecursoController } from '../controllers/recursos.controller';

const router = Router();

router.get('/', RecursoController.getAll);
router.get('/:id', RecursoController.getById);
router.post('/', RecursoController.create);
router.patch('/:id', RecursoController.update);
router.delete('/:id', RecursoController.delete);

export default router;