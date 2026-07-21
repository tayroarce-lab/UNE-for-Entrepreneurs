import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image file buffer directly to Cloudinary using streams.
 * 
 * @param fileBuffer The file buffer from Multer.
 * @param folder Optional folder name on Cloudinary.
 * @returns A promise that resolves to the secure URL of the uploaded image.
 */
export const uploadImage = (fileBuffer: Buffer, folder: string = 'une_entrepreneurs'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result) {
          return resolve(result.secure_url);
        }
        return reject(new Error('La subida de imagen falló sin retornar un resultado válido.'));
      }
    );

    // End the stream by writing the file buffer
    uploadStream.end(fileBuffer);
  });
};

export default {
  uploadImage,
};
