import { Router } from 'express';
import { TransaccionController } from '../controllers/transactions.controller';

const router = Router();

router.get('/', TransaccionController.getAll);
router.get('/:id', TransaccionController.getById);
router.post('/', TransaccionController.create);
router.patch('/:id', TransaccionController.update);
router.delete('/:id', TransaccionController.delete);

export default router;