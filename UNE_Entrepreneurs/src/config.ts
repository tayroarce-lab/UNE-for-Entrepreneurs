const isDev = import.meta.env.MODE === 'development';
export const API_BASE = import.meta.env.VITE_API_URL || (isDev ? 'http://localhost:3001' : 'https://une-for-entrepreneurs.onrender.com');
