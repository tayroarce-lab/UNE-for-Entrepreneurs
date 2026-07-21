import { Router } from 'express';
import { SolicitudContactoController } from '../controllers/solicitudesContacto.controller';

const router = Router();

router.get('/', SolicitudContactoController.getAll);
router.get('/:id', SolicitudContactoController.getById);
router.post('/', SolicitudContactoController.create);
router.patch('/:id', SolicitudContactoController.update);
router.delete('/:id', SolicitudContactoController.delete);

export default router;