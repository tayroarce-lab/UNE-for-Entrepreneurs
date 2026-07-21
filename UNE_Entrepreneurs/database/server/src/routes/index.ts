import { Router } from 'express';
import userRoutes from './user.routes';
import empresaRoutes from './empresa.routes';
import uploadRoutes from './upload.routes';

const router = Router();

router.use('/usuarios', userRoutes);
router.use('/proyectos', empresaRoutes);
router.use('/upload', uploadRoutes);

export default router;

