// ============================================================
// Servicio API para Gestión de Negocios (Finanzas e Inventario)
// ============================================================
import type { Transaction, InventoryItem } from '../types/business';

const API_BASE = 'http://localhost:3001';

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

// --------------- Inventory (Inventario) ---------------

export async function getInventoryItems(userId?: string): Promise<InventoryItem[]> {
  const url = userId ? `${API_BASE}/inventoryItems?userId=${userId}` : `${API_BASE}/inventoryItems`;
  const response = await fetch(url);
  return handleResponse<InventoryItem[]>(response);
}

export async function createInventoryItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
  const response = await fetch(`${API_BASE}/inventoryItems`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return handleResponse<InventoryItem>(response);
}

export async function updateInventoryItem(id: string | number, item: Partial<InventoryItem>): Promise<InventoryItem> {
  const response = await fetch(`${API_BASE}/inventoryItems/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return handleResponse<InventoryItem>(response);
}

export async function deleteInventoryItem(id: string | number): Promise<void> {
  const response = await fetch(`${API_BASE}/inventoryItems/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`Error al eliminar item de inventario: ${response.status}`);
}
