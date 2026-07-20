import { Router } from 'express';
import Joi from 'joi';
import EmpresaController from '../controllers/empresa.controller';
import { authenticateToken } from '../middlewares/autenticacion.middleware';
import validateRequest from '../middlewares/validacion.middleware';

const router = Router();

const proyectoSchema = Joi.object({
  nombre: Joi.string().min(3).required().messages({
    'string.empty': 'El nombre del proyecto no puede estar vacío.',
    'string.min': 'El nombre del proyecto debe tener al menos 3 caracteres.',
    'any.required': 'El nombre del proyecto es obligatorio.'
  }),
  descripcion: Joi.string().allow('', null),
  sector: Joi.string().allow('', null)
});

router.post('/', authenticateToken, validateRequest(proyectoSchema), EmpresaController.create);
router.get('/', authenticateToken, EmpresaController.listMyProjects);
router.get('/:id', authenticateToken, EmpresaController.getProjectDetails);
router.put('/:id', authenticateToken, validateRequest(proyectoSchema), EmpresaController.update);
router.delete('/:id', authenticateToken, EmpresaController.delete);

export default router;
