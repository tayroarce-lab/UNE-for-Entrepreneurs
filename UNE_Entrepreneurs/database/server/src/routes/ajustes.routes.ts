import { Router } from 'express';
import { AjustesController } from '../controllers/ajustes.controller';

const router = Router();

router.get('/', AjustesController.getAjustes);
router.put('/', AjustesController.updateAjustes);

export default router;
