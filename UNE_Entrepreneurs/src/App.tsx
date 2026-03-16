import AdminDashboard from './Components/AdminComponents/AdminDashboard'
import { Toaster } from 'sonner';
import ManejarUsuarios from './Components/AdminComponents/ManejarClientes'
import ManejarClientes from './Components/AdminComponents/ManejarClientes'
import ManejoPresupuesto from './Components/AdminComponents/ManejoPresupuesto'
import ManejoInventario from './Components/AdminComponents/ManejoInventario'
import ManejoFinanciaciones from './Components/AdminComponents/ManejoFinanciaciones'
import GestionTipsNoticias from './Components/AdminComponents/GestionTipsNoticias'
import Configuraciones from './Components/AdminComponents/Configuraciones'
import Notificaciones from './Components/AdminComponents/Configuración/Notificaciones'
import CambioCredenciales from './Components/AdminComponents/Configuración/CambioCredenciales'
import RolesPermisos from './Components/AdminComponents/Configuración/RolesPermisos'

function App() {
  const path = window.location.pathname;

  let Component;
  switch (path) {
    case '/':
    case '/AdminDashboard':
      Component = AdminDashboard;
      break;
    case '/ManejarUsuarios':
      Component = ManejarUsuarios;
      break;
    case '/ManejarClientes':
      Component = ManejarClientes;
      break;
    case '/ManejoPresupuesto':
      Component = ManejoPresupuesto;
      break;
    case '/ManejoInventario':
      Component = ManejoInventario;
      break;
    case '/ManejoFinanciaciones':
      Component = ManejoFinanciaciones;
      break;
    case '/GestionTipsNoticias':
      Component = GestionTipsNoticias;
      break;
    case '/Configuraciones':
      Component = Configuraciones;
      break;
    case '/Configuraciones/Notificaciones':
      Component = Notificaciones;
      break;
    case '/Configuraciones/CambioCredenciales':
      Component = CambioCredenciales;
      break;
    case '/Configuraciones/RolesPermisos':
      Component = RolesPermisos;
      break;
    default:
      Component = AdminDashboard;
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <Component />
    </>
  )
}

export default App
