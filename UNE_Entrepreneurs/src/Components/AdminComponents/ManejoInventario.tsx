import { useState } from 'react'
import '../../styles/ManejoInventario.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Package, ArrowLeft, Download, PlusCircle, PackageSearch } from 'lucide-react'


interface ProductoInventario {
    id: string;
    nombre: string;
    cantidad: number;
}

function ManejoInventario() {
  const [inventario] = useState<ProductoInventario[]>([
      { id: 'p1', nombre: 'Computadora Portátil HP', cantidad: 45 },
      { id: 'p2', nombre: 'Silla Ergonómica DX', cantidad: 8 },
      { id: 'p3', nombre: 'Teclado Mecánico', cantidad: 2 }
  ]);

  const obtenerAlertaStock = (cantidad: number) => {
      if(cantidad <= 5) return 'Alerta: Stock Crítico (Rojo)';
      if(cantidad <= 15) return 'Alerta: Stock Medio (Naranja)';
      return 'Stock Óptimo (Verde)';
  }

  const exportarDatos = () => {
      toast.info("Generando archivo CSV/Excel del Inventario en local... (Simulado)");
  }

  const handleNuevoProducto = () => {
      Swal.fire({
          title: 'Nuevo Producto',
          text: "¿Deseas agregar un nuevo producto al inventario?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, ir al formulario',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isConfirmed) {
              // Simulando navegación o acción de formulario
              toast.success('Abriendo formulario para nuevo producto');
          }
      });
  }

  return (
    <div className="admin-container admin-container-no-nav">
      <div className="admin-main-wrap">
        <header>
            <h1><Package size={24} /> Manejo de Inventario</h1>
            <button onClick={() => window.location.href = "/AdminDashboard"}><ArrowLeft size={16} /> Volver a Dashboard</button>
        </header>
        
        <section>
            <button onClick={exportarDatos}>
                <Download size={16} /> Exportar Inventario Actual
            </button>
            <button onClick={handleNuevoProducto}><PlusCircle size={16} /> Nuevo Producto</button>
        </section>

        <section>
            <h2><PackageSearch size={20} /> Lista de Stock</h2>
            <ul>
                {inventario.map((item: ProductoInventario) => (
                    <li key={item.id}>
                        <p><strong>{item.nombre}</strong> (ID: {item.id})</p>
                        <p>Cantidad restante: {item.cantidad} unidades</p>
                        <p>Estado del inventario: {obtenerAlertaStock(item.cantidad)}</p>
                        <hr/>
                    </li>
                ))}
            </ul>
        </section>
      </div>
    </div>
  )
}

export default ManejoInventario