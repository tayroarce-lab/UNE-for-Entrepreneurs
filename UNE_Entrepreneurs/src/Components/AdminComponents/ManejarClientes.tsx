import React, { useState } from 'react'
import '../../Styles/ManejarClientes.css'
import { UsersRound, ArrowLeft, Search, UserRoundSearch, Eye, X, Mail, Activity, ShoppingCart, Headset } from 'lucide-react'


interface Cliente {
    id: number;
    nombre: string;
    email: string;
    activo: boolean;
}

function ManejarClientes() {
  const [clientes] = useState<Cliente[]>([
      { id: 1, nombre: 'Natalia Villareal', email: 'nat@ejemplo.com', activo: true },
      { id: 2, nombre: 'Juan Pérez', email: 'juan@ejemplo.com', activo: false }
  ]);
  
  const [busqueda, setBusqueda] = useState<string>('');
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);

  const clientesFiltrados = clientes.filter((cliente: Cliente) => 
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirModal = (cliente: Cliente) => {
      setClienteSeleccionado(cliente);
      setModalAbierto(true);
  }

  return (
    <div className="admin-container admin-container-no-nav">
      <div className="admin-main-wrap">
        <header>
            <h1><UsersRound size={24} /> Manejo de Clientes</h1>
            <button onClick={() => window.location.href = "/AdminDashboard"}><ArrowLeft size={16} /> Volver a Dashboard</button>
        </header>

        <section>
             <input 
                 type="text" 
                 placeholder="Buscar cliente por nombre..." 
                 value={busqueda}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value)}
             />
        </section>

        <section>
            <h2><UserRoundSearch size={20} /> Lista de Clientes</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones Rápidas</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesFiltrados.length > 0 ? clientesFiltrados.map((cliente: Cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <button onClick={() => abrirModal(cliente)}><Eye size={14} /> Ver Historial</button>
                            </td>
                        </tr>
                    )) : <tr><td colSpan={3}>No se encontraron clientes</td></tr>}
                </tbody>
            </table>
        </section>

        {modalAbierto && clienteSeleccionado && (
            <div>
                <hr/>
                <h2><Activity size={20} /> Detalles Históricos de {clienteSeleccionado.nombre}</h2>
                <div>
                    <p><Mail size={14} /> Email de contacto: {clienteSeleccionado.email}</p>
                    <p><Activity size={14} /> Estado de cuenta: {clienteSeleccionado.activo ? 'Activo' : 'Bloqueado'}</p>
                    <h4>Últimas interacciones:</h4>
                    <ul>
                        <li><ShoppingCart size={14} /> Compra Reciente: Paquete Consultoría $500 (Hace 2 días)</li>
                        <li><Headset size={14} /> Soporte Técnico: Ticket Solucionado</li>
                    </ul>
                </div>
                <button onClick={() => setModalAbierto(false)}><X size={14} /> Cerrar Historial</button>
                <hr/>
            </div>
        )}
      </div>
    </div>
  )
}

export default ManejarClientes