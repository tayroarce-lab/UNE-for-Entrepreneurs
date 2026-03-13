// ============================================================
// Servicio API para Financiamientos — json-server
// ============================================================
import type {
  FinancingProgram,
  Application,
  Report,
  Favorite,
  UserBudgetEntry,
} from '../types/financing';

const API_BASE = 'http://localhost:3001';

// --------------- Helpers ---------------

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  return response.json() as Promise<T>;
}

function buildQuery(params: Record<string, string | number | boolean | null | undefined>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

// --------------- Financing Programs ---------------

export async function getFinancingPrograms(filters?: {
  q?: string;
  type?: string;
  region?: string;
  tags_like?: string;
  minAmount_gte?: number;
  maxAmount_lte?: number;
  status?: string;
  _page?: number;
  _limit?: number;
}): Promise<{ data: FinancingProgram[]; total: number }> {
  const query = buildQuery(filters ?? {});
  const response = await fetch(`${API_BASE}/financingPrograms${query}`);
  const total = parseInt(response.headers.get('X-Total-Count') ?? '0', 10);
  const data = await handleResponse<FinancingProgram[]>(response);
  return { data, total: total || data.length };
}

export async function getFinancingProgramById(id: string): Promise<FinancingProgram> {
  const response = await fetch(`${API_BASE}/financingPrograms/${id}`);
  return handleResponse<FinancingProgram>(response);
}

export async function createFinancingProgram(
  program: Omit<FinancingProgram, 'id'>
): Promise<FinancingProgram> {
  const response = await fetch(`${API_BASE}/financingPrograms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(program),
  });
  return handleResponse<FinancingProgram>(response);
}

export async function updateFinancingProgram(
  id: string,
  program: Partial<FinancingProgram>
): Promise<FinancingProgram> {
  const response = await fetch(`${API_BASE}/financingPrograms/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(program),
  });
  return handleResponse<FinancingProgram>(response);
}

export async function deleteFinancingProgram(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/financingPrograms/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error al eliminar programa: ${response.status}`);
  }
}

// --------------- Applications ---------------

export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${API_BASE}/applications`);
  return handleResponse<Application[]>(response);
}

export async function createApplication(
  application: Omit<Application, 'id'>
): Promise<Application> {
  const response = await fetch(`${API_BASE}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(application),
  });
  // Simular envío de correo
  console.info(
    `📧 Correo simulado enviado a contacto del programa y a contactUNE@une.cr con los datos de la aplicación.`
  );
  return handleResponse<Application>(response);
}

// --------------- Reports ---------------

export async function createReport(report: Omit<Report, 'id'>): Promise<Report> {
  const response = await fetch(`${API_BASE}/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(report),
  });
  return handleResponse<Report>(response);
}

// --------------- Favorites ---------------

export async function getFavorites(userId: string): Promise<Favorite[]> {
  const response = await fetch(`${API_BASE}/favorites?userId=${userId}`);
  return handleResponse<Favorite[]>(response);
}

export async function addFavorite(
  favorite: Omit<Favorite, 'id'>
): Promise<Favorite> {
  const response = await fetch(`${API_BASE}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(favorite),
  });
  return handleResponse<Favorite>(response);
}

export async function removeFavorite(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/favorites/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error al eliminar favorito: ${response.status}`);
  }
}

// --------------- User Budget ---------------

export async function getUserBudget(userId: string): Promise<UserBudgetEntry[]> {
  const response = await fetch(`${API_BASE}/userBudget?userId=${userId}`);
  return handleResponse<UserBudgetEntry[]>(response);
}

export async function addToBudget(
  entry: Omit<UserBudgetEntry, 'id'>
): Promise<UserBudgetEntry> {
  const response = await fetch(`${API_BASE}/userBudget`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return handleResponse<UserBudgetEntry>(response);
}

// --------------- Tags ---------------

export async function getTags(): Promise<string[]> {
  const response = await fetch(`${API_BASE}/tags`);
  const data = await handleResponse<{ list: string[] }>(response);
  return data.list || [];
}
