import { Router } from 'express';
import { CasoExitoController } from '../controllers/casosDeExito.controller';

const router = Router();

router.get('/', CasoExitoController.getAll);
router.get('/:id', CasoExitoController.getById);
router.post('/', CasoExitoController.create);
router.patch('/:id', CasoExitoController.update);
router.delete('/:id', CasoExitoController.delete);

export default router;