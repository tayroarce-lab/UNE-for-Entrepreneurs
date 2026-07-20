import { Router } from 'express';
import Joi from 'joi';
import UserController from '../controllers/user.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/autenticacion.middleware';
import validateRequest from '../middlewares/validacion.middleware';

const router = Router();

const registerSchema = Joi.object({
  nombre: Joi.string().min(3).required().messages({
    'string.empty': 'El nombre no puede estar vacío.',
    'string.min': 'El nombre debe tener al menos 3 caracteres.',
    'any.required': 'El nombre es un campo obligatorio.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Debe proporcionar un correo electrónico válido.',
    'any.required': 'El correo electrónico es obligatorio.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres.',
    'any.required': 'La contraseña es obligatoria.'
  }),
  rol: Joi.string().valid('admin', 'emprendedor', 'mentor').default('emprendedor'),
  url_foto_perfil: Joi.string().uri().allow('', null)
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Debe proporcionar un correo electrónico válido.',
    'any.required': 'El correo electrónico es obligatorio.'
  }),
  password: Joi.string().required().messages({
    'any.required': 'La contraseña es obligatoria.'
  })
});

router.post('/register', validateRequest(registerSchema), UserController.register);
router.post('/login', validateRequest(loginSchema), UserController.login);
router.get('/profile', authenticateToken, UserController.getProfile);
router.get('/', authenticateToken, authorizeRoles('admin'), UserController.getAllUsers);

export default router;
