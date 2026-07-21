import { Router } from 'express';
import { NoticiaController } from '../controllers/news.controller';

const router = Router();

router.get('/', NoticiaController.getAll);
router.get('/:id', NoticiaController.getById);
router.post('/', NoticiaController.create);
router.patch('/:id', NoticiaController.update);
router.delete('/:id', NoticiaController.delete);

export default router;