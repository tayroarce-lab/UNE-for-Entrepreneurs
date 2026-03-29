import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { ProductoInventario } from '../../../services/InventarioService';
import type { InventarioFormData } from '../hooks/useInventario';
import styles from './InventarioDashboard.module.css'; // Will be moved

interface InventarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (editingId: string | null, data: InventarioFormData) => Promise<boolean>;
  categoriasU: string[];
  productoAEditar?: ProductoInventario | null;
  isSaving: boolean;
}

export const InventarioModal = ({
  isOpen,
  onClose,
  onSave,
  categoriasU,
  productoAEditar,
  isSaving
}: InventarioModalProps) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState<string | number>('');
  const [stock, setStock] = useState<string | number>('');
  const [stockMinimo, setStockMinimo] = useState<string | number>('');
  const [unidad, setUnidad] = useState('Unidades');

  useEffect(() => {
    if (isOpen) {
      if (productoAEditar) {
        setNombre(productoAEditar.nombre);
        setCategoria(productoAEditar.categoria);
        setPrecio(productoAEditar.precio);
        setStock(productoAEditar.stock);
        setStockMinimo(productoAEditar.stockMinimo);
        setUnidad(productoAEditar.unidad);
      } else {
        setNombre('');
        setCategoria('');
        setPrecio('');
        setStock('');
        setStockMinimo('');
        setUnidad('Unidades');
      }
    }
  }, [isOpen, productoAEditar]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !categoria || precio === '' || stock === '' || stockMinimo === '') {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    const success = await onSave(productoAEditar?.id || null, {
      nombre,
      categoria,
      precio,
      stock,
      stockMinimo,
      unidad
    });

    if (success) onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {productoAEditar ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Nombre del Producto *</label>
            <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Empaques Biodegradables" disabled={isSaving} />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Categoría *</label>
              <input type="text" list="categorias-existentes" required value={categoria} onChange={e => setCategoria(e.target.value)} placeholder="Ej. Materia Prima" disabled={isSaving} />
              <datalist id="categorias-existentes">
                {categoriasU.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div className={styles.formGroup}>
              <label>Unidad de Medida</label>
              <select value={unidad} onChange={e => setUnidad(e.target.value)} disabled={isSaving}>
                <option value="Unidades">Unidades (uds)</option>
                <option value="Kg">Kilogramos (kg)</option>
                <option value="Litros">Litros (L)</option>
                <option value="Cajas">Cajas</option>
                <option value="Metros">Metros (m)</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Precio Unitario de Venta (₡) *</label>
            <input type="number" required min="0" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="0.00" disabled={isSaving} />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Stock Actual *</label>
              <input type="number" required min="0" value={stock} onChange={e => setStock(e.target.value)} placeholder="0" disabled={isSaving} />
            </div>
            <div className={styles.formGroup}>
              <label>Stock Mínimo (Alerta) *</label>
              <input type="number" required min="0" value={stockMinimo} onChange={e => setStockMinimo(e.target.value)} placeholder="0" disabled={isSaving} />
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.btnCancel} onClick={onClose} disabled={isSaving}>Cancelar</button>
            <button type="submit" className={styles.btnSubmit} disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
