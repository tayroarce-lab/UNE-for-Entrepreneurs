import { API_BASE } from '@/constants/config';

export interface CasoExito {
  id: string;
  nombre: string;
  profesion: string;
  ubicacion: string;
  cita: string;
  imagen: string;
  colorTag: string;
  activo: boolean;
  fecha: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  return response.json() as Promise<T>;
}

export const getCasosExito = async (): Promise<CasoExito[]> => {
  const response = await fetch(`${API_BASE}/casosDeExito`);
  return handleResponse<CasoExito[]>(response);
};

export const createCasoExito = async (caso: Omit<CasoExito, 'id'>): Promise<CasoExito> => {
  const response = await fetch(`${API_BASE}/casosDeExito`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(caso),
  });
  return handleResponse<CasoExito>(response);
};

export const updateCasoExito = async (id: string, caso: Partial<CasoExito>): Promise<CasoExito> => {
  const response = await fetch(`${API_BASE}/casosDeExito/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(caso),
  });
  return handleResponse<CasoExito>(response);
};

export const deleteCasoExito = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/casosDeExito/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar caso de éxito');
};
