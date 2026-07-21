import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/upload.controller';

const router = Router();

// Configure Multer storage to keep files in memory buffer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // limit size to 10MB
  },
  fileFilter: (_req, file, cb) => {
    // Only allow common image formats
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('El archivo debe ser una imagen válida.'));
    }
  },
});

// Route to handle image upload
// Expects multipart/form-data with key 'file' or 'imagen'
router.post('/', upload.single('file'), uploadFile);

export default router;
