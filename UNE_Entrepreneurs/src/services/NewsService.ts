import type { Noticia } from '../components/AdminComponents/GestionTipsNoticias';

const API_BASE = 'http://localhost:3001';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  return response.json() as Promise<T>;
}

export const getNews = async (): Promise<Noticia[]> => {
  const response = await fetch(`${API_BASE}/news`);
  return handleResponse<Noticia[]>(response);
};

export const createNews = async (news: Omit<Noticia, 'id'>): Promise<Noticia> => {
  const response = await fetch(`${API_BASE}/news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(news),
  });
  return handleResponse<Noticia>(response);
};

export const updateNews = async (id: string, news: Partial<Noticia>): Promise<Noticia> => {
  const response = await fetch(`${API_BASE}/news/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(news),
  });
  return handleResponse<Noticia>(response);
};

export const deleteNews = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/news/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar noticia');
};
