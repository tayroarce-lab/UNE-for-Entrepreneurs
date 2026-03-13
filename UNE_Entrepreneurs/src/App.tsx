import AdminDashboard from './Components/AdminComponents/AdminDashboard'
import { Toaster } from 'sonner';
import ManejarUsuarios from './Components/AdminComponents/ManejarClientes'
import ManejarClientes from './Components/AdminComponents/ManejarClientes'
import ManejoPresupuesto from './Components/AdminComponents/ManejoPresupuesto'
import ManejoInventario from './Components/AdminComponents/ManejoInventario'
import ManejoFinanciaciones from './Components/AdminComponents/ManejoFinanciaciones'
import GestionTipsNoticias from './Components/AdminComponents/GestionTipsNoticias'
import Configuraciones from './Components/AdminComponents/Configuraciones'

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
