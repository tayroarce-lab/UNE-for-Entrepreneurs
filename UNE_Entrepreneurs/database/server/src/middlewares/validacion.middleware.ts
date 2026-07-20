import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateRequest = (schema: Schema, property: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const { error } = schema.validate(req[property], { abortEarly: false, allowUnknown: true });
    
    if (error) {
      const errorDetails = error.details.map((detail) => detail.message);
      return res.status(400).json({ 
        mensaje: 'Error de validación de datos.',
        errores: errorDetails 
      });
    }
    
    next();
  };
};
export default validateRequest;
