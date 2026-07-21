import { Request, Response } from 'express';
import { uploadImage } from '../services/cloudinary.service';

/**
 * Endpoint controller to receive a file and upload it to Cloudinary.
 */
export const uploadFile = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se ha seleccionado ningún archivo para subir.' });
    }

    // Upload the file buffer to Cloudinary
    const secureUrl = await uploadImage(req.file.buffer);

    return res.status(200).json({
      mensaje: 'Imagen subida exitosamente a Cloudinary.',
      url: secureUrl,
    });
  } catch (error: any) {
    console.error('Error al subir imagen a Cloudinary:', error);
    return res.status(500).json({
      mensaje: 'Error al procesar la subida de imagen.',
      error: error.message || error,
    });
  }
};

export default {
  uploadFile,
};
