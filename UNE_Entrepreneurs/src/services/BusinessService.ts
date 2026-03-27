// ============================================================
// Servicio API para Gestión de Negocios (Finanzas e Inventario)
// ============================================================
import type { Transaction } from '../types/business';

import { API_BASE } from '../config';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }
  return response.json() as Promise<T>;
}

// --------------- Transactions (Finanzas) ---------------

export async function getTransactions(userId?: string): Promise<Transaction[]> {
  const url = userId ? `${API_BASE}/transactions?userId=${userId}&_sort=date&_order=desc` : `${API_BASE}/transactions?_sort=date&_order=desc`;
  const response = await fetch(url);
  return handleResponse<Transaction[]>(response);
}

export async function createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
  const response = await fetch(`${API_BASE}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  return handleResponse<Transaction>(response);
}

export async function updateTransaction(id: string | number, transaction: Partial<Transaction>): Promise<Transaction> {
  const response = await fetch(`${API_BASE}/transactions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  return handleResponse<Transaction>(response);
}

export async function deleteTransaction(id: string | number): Promise<void> {
  const response = await fetch(`${API_BASE}/transactions/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`Error al eliminar transacción: ${response.status}`);
}
