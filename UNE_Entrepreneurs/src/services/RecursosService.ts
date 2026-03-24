import { API_BASE } from '../config';

export interface Recurso {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: string;
  enlace: string;
  activo: boolean;
  fecha: string;
}

const API_URL = `${API_BASE}/recursos`;

export const getRecursos = async (): Promise<Recurso[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener recursos');
  return response.json();
};

export const createRecurso = async (recurso: Omit<Recurso, 'id'>): Promise<Recurso> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recurso)
  });
  if (!response.ok) throw new Error('Error al crear recurso');
  return response.json();
};

export const updateRecurso = async (id: string, recurso: Partial<Recurso>): Promise<Recurso> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recurso)
  });
  if (!response.ok) throw new Error('Error al actualizar recurso');
  return response.json();
};

export const deleteRecurso = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar recurso');
};

