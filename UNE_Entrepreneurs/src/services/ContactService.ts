import { API_BASE } from '../config';

export interface SolicitudContacto {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  ubicacion: string;
  negocio: string;
  mensaje: string;
  fechaRegistro: string;
  estado: 'Pendiente' | 'Contactado' | 'Descartado';
  notasAdmin?: string;
}

export const getContactos = async (): Promise<SolicitudContacto[]> => {
  try {
    const response = await fetch(`${API_BASE}/solicitudesContacto`);
    if (!response.ok) throw new Error('Error fetching contacts');
    return await response.json();
  } catch (error) {
    console.error('Error in getContactos:', error);
    return [];
  }
};

export const postContacto = async (contacto: Omit<SolicitudContacto, 'id' | 'fechaRegistro' | 'estado'>) => {
  const newContacto = {
    ...contacto,
    fechaRegistro: new Date().toISOString(),
    estado: 'Pendiente'
  };
  
  try {
    const response = await fetch(`${API_BASE}/solicitudesContacto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContacto)
    });
    if (!response.ok) throw new Error('Error posting contact');
    return await response.json();
  } catch (error) {
    console.error('Error in postContacto:', error);
    throw error;
  }
};

export const updateContacto = async (id: string, data: Partial<SolicitudContacto>) => {
  try {
    const response = await fetch(`${API_BASE}/solicitudesContacto/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error updating contact');
    return await response.json();
  } catch (error) {
    console.error('Error in updateContacto:', error);
    throw error;
  }
};

export const deleteContacto = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE}/solicitudesContacto/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error deleting contact');
    return true;
  } catch (error) {
    console.error('Error in deleteContacto:', error);
    throw error;
  }
};
