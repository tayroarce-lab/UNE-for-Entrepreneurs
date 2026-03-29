import { API_BASE } from '../config';

export interface ProductoInventario {
  id: string;
  userId: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  unidad: string;
  descripcion?: string;
  createdAt: string;
  updatedAt: string;
}

type NuevoProducto = Omit<ProductoInventario, 'id' | 'createdAt' | 'updatedAt'>;

const BASE = `${API_BASE}/inventario`;

export async function getInventario(userId: string): Promise<ProductoInventario[]> {
  const res = await fetch(`${BASE}?userId=${userId}`);
  if (!res.ok) throw new Error('Error al cargar inventario');
  return res.json();
}

export async function createProducto(data: NuevoProducto): Promise<ProductoInventario> {
  const now = new Date().toISOString();
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, createdAt: now, updatedAt: now }),
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
}

export async function updateProducto(
  id: string,
  data: Partial<ProductoInventario>
): Promise<ProductoInventario> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, updatedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error('Error al actualizar producto');
  return res.json();
}

export async function deleteProducto(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar producto');
}
