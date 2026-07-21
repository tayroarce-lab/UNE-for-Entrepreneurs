import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base API route
app.use('/api', routes);

// Simple Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'UNE Backend is running.' });
});

// Fallback Route
app.use((_req: Request, res: Response) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada.' });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    mensaje: 'Ha ocurrido un error interno en el servidor.',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

export default app;
