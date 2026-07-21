import { API_BASE } from '@/constants/config';

export interface AjustesSistema {
  id?: number;
  une_loan_max: number;
  commission: number;
  createdAt?: string;
  updatedAt?: string;
}

export const getAjustes = async (): Promise<AjustesSistema> => {
  const response = await fetch(`${API_BASE}/ajustes`);
  if (!response.ok) throw new Error('Error al obtener ajustes del sistema');
  return response.json();
};

export const updateAjustes = async (ajustes: Partial<AjustesSistema>): Promise<AjustesSistema> => {
  const response = await fetch(`${API_BASE}/ajustes`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ajustes),
  });
  if (!response.ok) throw new Error('Error al actualizar ajustes del sistema');
  return response.json();
};
