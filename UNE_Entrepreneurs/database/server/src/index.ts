import app from './app';
import { sequelize } from './models';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Conectando a la base de datos MySQL...');
    await sequelize.authenticate();
    console.log('Conexión con MySQL establecida exitosamente.');

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
      console.log(`Ruta de salud: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos o iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
