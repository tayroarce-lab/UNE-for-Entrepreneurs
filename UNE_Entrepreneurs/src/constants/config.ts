const envUrl = import.meta.env.VITE_API_URL || '';
export const API_BASE = envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
