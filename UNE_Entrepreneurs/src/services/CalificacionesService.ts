const API_BASE = 'http://localhost:3001';

export interface Testimonio {
  id: string;
  userName: string;
  userRole: string;
  content: string;
  avatar: string;
  active: boolean;
  date: string;
}

export interface Calificacion {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  return response.json() as Promise<T>;
}

export const getTestimonials = async (): Promise<Testimonio[]> => {
  const response = await fetch(`${API_BASE}/testimonials`);
  return handleResponse<Testimonio[]>(response);
};

export const updateTestimonial = async (id: string, testimonial: Partial<Testimonio>): Promise<Testimonio> => {
  const response = await fetch(`${API_BASE}/testimonials/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testimonial),
  });
  return handleResponse<Testimonio>(response);
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/testimonials/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar testimonio');
};

export const getRatings = async (): Promise<Calificacion[]> => {
  const response = await fetch(`${API_BASE}/ratings`);
  return handleResponse<Calificacion[]>(response);
};

export const deleteRating = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/ratings/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar calificación');
};
