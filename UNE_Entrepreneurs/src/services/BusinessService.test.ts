import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTransactions } from './BusinessService';
import { API_BASE } from '@/constants/config';

// Mock de fetch global
globalThis.fetch = vi.fn();

describe('BusinessService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería obtener transacciones correctamente', async () => {
    const mockData = [
      { id: 1, userId: '1', description: 'Venta', amount: 100, type: 'income', category: 'Ventas', date: '2026-01-01' }
    ];

    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData
    });

    const transactions = await getTransactions('1');

    expect(globalThis.fetch).toHaveBeenCalledWith(`${API_BASE}/transactions?userId=1&_sort=date&_order=desc`);
    expect(transactions).toEqual(mockData);
  });

  it('debería lanzar un error si la respuesta no es ok', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error'
    });

    await expect(getTransactions('1')).rejects.toThrow('Error 500: Internal Server Error');
  });
});
