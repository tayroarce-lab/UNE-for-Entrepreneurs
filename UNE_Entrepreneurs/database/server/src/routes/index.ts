import { Router } from 'express';
import userRoutes from './user.routes';
import empresaRoutes from './empresa.routes';
import uploadRoutes from './upload.routes';
import noticiaRoutes from './news.routes';
import transaccionRoutes from './transactions.routes';
import inventarioRoutes from './inventario.routes';
import casoExitoRoutes from './casosDeExito.routes';
import solicitudContactoRoutes from './solicitudesContacto.routes';
import recursoRoutes from './recursos.routes';

const router = Router();

router.use('/usuarios', userRoutes);
router.use('/proyectos', empresaRoutes);
router.use('/upload', uploadRoutes);

router.use('/news', noticiaRoutes);
router.use('/transactions', transaccionRoutes);
router.use('/inventario', inventarioRoutes);
router.use('/casosDeExito', casoExitoRoutes);
router.use('/solicitudesContacto', solicitudContactoRoutes);
router.use('/recursos', recursoRoutes);

export default router;
