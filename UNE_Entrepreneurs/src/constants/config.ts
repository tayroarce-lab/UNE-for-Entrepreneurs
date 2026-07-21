let envUrl = import.meta.env.VITE_API_URL || '';
if (envUrl.endsWith('/')) envUrl = envUrl.slice(0, -1);
export const API_BASE = envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
