import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import {
  getInventario,
  createProducto,
  updateProducto,
  deleteProducto,
  type ProductoInventario
} from '../../../services/InventarioService';
import { useAuth } from '../../../context/AuthContext';

export interface InventarioFormData {
  nombre: string;
  categoria: string;
  precio: string | number;
  stock: string | number;
  stockMinimo: string | number;
  unidad: string;
}

export const useInventario = () => {
  const { user } = useAuth();
  const [productos, setProductos] = useState<ProductoInventario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('Todas');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      cargarInventario();
    }
  }, [user]);

  const cargarInventario = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getInventario(user.id);
      setProductos(data || []);
    } catch {
      toast.error('Grave: No se pudo conectar con el inventario.');
    } finally {
      setLoading(false);
    }
  };

  const saveProducto = async (editingId: string | null, formData: InventarioFormData) => {
    if (!user) return false;
    
    setIsSaving(true);
    try {
      const payload = {
        userId: user.id,
        nombre: formData.nombre,
        categoria: formData.categoria,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        stockMinimo: Number(formData.stockMinimo),
        unidad: formData.unidad
      };

      if (editingId) {
        await updateProducto(editingId, payload);
        toast.success('Producto actualizado exitosamente');
      } else {
        await createProducto(payload);
        toast.success('Producto agregado al inventario');
      }
      await cargarInventario();
      return true;
    } catch {
      toast.error('Ocurrió un error al guardar el producto');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProductoAction = (id: string, nombreProd: string) => {
    Swal.fire({
      title: '¿Eliminar producto?',
      html: `Estás a punto de borrar <strong>${nombreProd}</strong>. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--suria-crimson)',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProducto(id);
          toast.success('Producto eliminado');
          setProductos(prev => prev.filter(p => p.id !== id));
        } catch {
          toast.error('Error al intentar eliminar');
        }
      }
    });
  };

  const categoriasU = useMemo(() => {
    return Array.from(new Set(productos.map(p => p.categoria)));
  }, [productos]);

  const filtrados = useMemo(() => {
    return productos.filter(p => {
      const matchCat = selectedCategoria === 'Todas' || p.categoria === selectedCategoria;
      const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [productos, selectedCategoria, searchTerm]);

  const valorTotalInventario = useMemo(() => {
    return productos.reduce((acc, curr) => acc + (curr.precio * curr.stock), 0);
  }, [productos]);

  const itemsBajos = useMemo(() => {
    return productos.filter(p => p.stock <= p.stockMinimo).length;
  }, [productos]);

  return {
    productos,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCategoria,
    setSelectedCategoria,
    isSaving,
    categoriasU,
    filtrados,
    valorTotalInventario,
    itemsBajos,
    saveProducto,
    deleteProductoAction,
    cargarInventario
  };
};
