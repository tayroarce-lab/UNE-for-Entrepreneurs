import { createBrowserRouter } from 'react-router-dom';
import AdminDashboard from '../components/AdminComponents/AdminDashboard';
import ManejarClientes from '../components/AdminComponents/ManejarClientes';
import ManejoPresupuesto from '../components/AdminComponents/ManejoPresupuesto';
import ManejoInventario from '../components/AdminComponents/ManejoInventario';
import ManejoFinanciaciones from '../components/AdminComponents/ManejoFinanciaciones';
import GestionTipsNoticias from '../components/AdminComponents/GestionTipsNoticias';
import Configuraciones from '../components/AdminComponents/Configuraciones';
import Notificaciones from '../components/AdminComponents/Configuración/Notificaciones';
import CambioCredenciales from '../components/AdminComponents/Configuración/CambioCredenciales';
import RolesPermisos from '../components/AdminComponents/Configuración/RolesPermisos';
import Maps from '../components/AdminComponents/Maps';

const router = createBrowserRouter([
  { path: '/',                              element: <AdminDashboard /> },
  { path: '/AdminDashboard',               element: <AdminDashboard /> },
  { path: '/ManejarUsuarios',              element: <ManejarClientes /> },
  { path: '/ManejarClientes',             element: <ManejarClientes /> },
  { path: '/ManejoPresupuesto',           element: <ManejoPresupuesto /> },
  { path: '/ManejoInventario',            element: <ManejoInventario /> },
  { path: '/ManejoFinanciaciones',        element: <ManejoFinanciaciones /> },
  { path: '/GestionTipsNoticias',         element: <GestionTipsNoticias /> },
  { path: '/Configuraciones',             element: <Configuraciones /> },
  { path: '/Configuraciones/Notificaciones',       element: <Notificaciones /> },
  { path: '/Configuraciones/CambioCredenciales',   element: <CambioCredenciales /> },
  { path: '/Configuraciones/RolesPermisos',        element: <RolesPermisos /> },
  { path: '/MapaSucursales',               element: <Maps /> },
]);

export default router;