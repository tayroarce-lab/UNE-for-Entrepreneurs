import React, { useState } from 'react'
import '../../Styles/AdminDashboard.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { LayoutDashboard, Users, Banknote, Newspaper, Settings, LogOut, BarChart3, DollarSign, AlertTriangle } from 'lucide-react'


type KPIProps = {
  titulo: string;
  valor: string | number;
}

const KPICard = ({ titulo, valor }: KPIProps) => (
  <div>
    <h3>{titulo}</h3>
    <p>{valor}</p>
  </div>
)

function AdminDashboard() {
  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "Tendrás que volver a iniciar sesión para acceder",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        toast.success('Sesión finalizada exitosamente');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
    });
  }

  return (
    <div className="admin-container">
      <nav>
        <h2>UNE Costa Rica</h2>
        <ul>
          <li><a href="./AdminDashboard" className="active"><LayoutDashboard size={18} /> Dashboard</a></li>
          <li><a href="./ManejarUsuarios"><Users size={18} /> Gestión de Usuarios</a></li>
          <li><a href="./ManejoFinanciaciones"><Banknote size={18} /> Financiaciones</a></li>
          <li><a href="./GestionTipsNoticias"><Newspaper size={18} /> Tips y Noticias</a></li>
          <li><a href="./Configuraciones"><Settings size={18} /> Configuración</a></li>
        </ul>
      </nav>

      <div className="admin-main-wrap">
      <header>
        <h1><LayoutDashboard size={24} /> Dashboard Principal</h1>
        <button onClick={handleLogout}><LogOut size={16} /> Cerrar Sesión</button>
      </header>

      <main>
        <section>
          <h2><BarChart3 size={20} /> Métricas Clave (KPIs)</h2>
          <KPICard titulo="Total Clientes" valor={125} />
          <KPICard titulo="Presupuesto Restante" valor="$14,500" />
          <KPICard titulo="Alertas de Stock" valor={3} />
        </section>
      </main>

      <footer>
        <p>Actualice los consejos financieros y noticias del sector para que los usuarios de FinanciaPyme CR estén siempre informados.</p>
      </footer>
      </div>
    </div>
  )
}

export default AdminDashboard