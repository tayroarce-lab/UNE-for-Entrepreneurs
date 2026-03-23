import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom';
import AdminDashboard from '../components/AdminComponents/AdminDashboard';
import ManejarClientes from '../components/AdminComponents/ManejarClientes';
import ManejoPresupuesto from '../components/AdminComponents/ManejoPresupuesto';
import ManejoInventario from '../components/AdminComponents/ManejoInventario';
import GestionTipsNoticias from '../components/AdminComponents/GestionTipsNoticias';
import Configuraciones from '../components/AdminComponents/Configuraciones';
import Notificaciones from '../components/AdminComponents/Configuracion/Notificaciones';
import CambioCredenciales from '../components/AdminComponents/Configuracion/CambioCredenciales';
import RolesPermisos from '../components/AdminComponents/Configuracion/RolesPermisos';
import Maps from '../components/AdminComponents/Maps';
import Calificaciones from '../components/AdminComponents/Calificaciones';
import GestionRecursos from '../components/AdminComponents/GestionRecursos';

import HomeUsers from '../pages/UserPages/HomeUsers';
import InicioSesion from '../pages/UserPages/InicioSesion';
import RegistroUser from '../pages/UserPages/RegistroUser';
import SuriaCatalogPage from '../pages/UserPages/SuriaCatalogPage';
import SuriaDetailPage from '../pages/UserPages/SuriaDetailPage';
import AdminSuriaPageWrapper from '../pages/UserPages/AdminSuriaPage';
import ProtectedRoute from './ProtectedRoute';
import BudgetPage from '../pages/UserPages/BudgetPage';
import ProfilePage from '../pages/UserPages/ProfilePage';
import NewsPage from '../pages/UserPages/NewsPage';
import NotFoundPage from '../pages/UserPages/NotFoundPage';

const RootLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomeUsers />,
      },
      {
        path: '/noticias',
        element: <NewsPage />,
      },
      {
        path: '/presupuesto',
        element: <ProtectedRoute />, // Solo usuarios logueados
        children: [
          { path: '', element: <BudgetPage /> },
          { path: 'perfil', element: <ProfilePage /> },
        ]
      },
      {
        path: '/login',
        element: <InicioSesion />,
      },
      {
        path: '/registro',
        element: <RegistroUser />,
      },
      {
        path: '/financiamiento',
        element: <ProtectedRoute />, // Solo usuarios logueados
        children: [
          { path: '', element: <SuriaCatalogPage /> },
          { path: ':id', element: <SuriaDetailPage /> },
          { path: 'perfil', element: <ProfilePage /> },
        ]
      },
      {
        path: '/perfil',
        element: <ProtectedRoute />,
        children: [
          { path: '', element: <ProfilePage /> },
        ]
      },
      {
        path: '/admin',
        element: <ProtectedRoute adminOnly />, // Solo admins
        children: [
          { path: '', element: <AdminDashboard /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'usuarios', element: <ManejarClientes /> },
          { path: 'clientes', element: <ManejarClientes /> },
          { path: 'presupuesto', element: <ManejoPresupuesto /> },
          { path: 'inventario', element: <ManejoInventario /> },
          { path: 'noticias', element: <GestionTipsNoticias /> },
          { path: 'configuraciones', element: <Configuraciones /> },
          { path: 'configuraciones/notificaciones', element: <Notificaciones /> },
          { path: 'configuraciones/credenciales', element: <CambioCredenciales /> },
          { path: 'configuraciones/roles', element: <RolesPermisos /> },
          { path: 'mapa', element: <Maps /> },
          { path: 'financiamiento', element: <AdminSuriaPageWrapper /> },
          { path: 'calificaciones', element: <Calificaciones /> },
          { path: 'recursos', element: <GestionRecursos /> },
        ]
      },
      {
        path: '*',
        element: <NotFoundPage />,
      }
    ]
  }
]);

export default router;