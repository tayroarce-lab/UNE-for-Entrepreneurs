import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    rol: 'admin' | 'emprendedor' | 'mentor';
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'super_secret_jwt_key_une_2026';
    const decoded = jwt.verify(token, jwtSecret) as AuthenticatedRequest['user'];
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado.' });
  }
};

export const authorizeRoles = (...roles: Array<'admin' | 'emprendedor' | 'mentor'>) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    if (!req.user) {
      return res.status(401).json({ mensaje: 'No autenticado.' });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ mensaje: 'Acceso prohibido para este rol.' });
    }

    next();
  };
};
