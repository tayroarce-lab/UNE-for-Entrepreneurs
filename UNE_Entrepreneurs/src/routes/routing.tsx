/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom';

// ── Admin Components ──────────────────────────────────────────
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
import GestionSolicitudes from '../components/AdminComponents/GestionSolicitudes';
import Calificaciones from '../components/AdminComponents/Calificaciones';
import GestionRecursos from '../components/AdminComponents/GestionRecursos';
import GestionCasosExito from '../components/AdminComponents/GestionCasosExito';

// ── User Pages ────────────────────────────────────────────────
import HomeUsers from '../pages/UserPages/HomeUsers';
import InicioSesion from '../pages/UserPages/InicioSesion';
import RegistroUser from '../pages/UserPages/RegistroUser';
import SuriaCatalogPage from '../pages/UserPages/SuriaCatalogPage';
import SuriaDetailPage from '../pages/UserPages/SuriaDetailPage';
import AdminSuriaPageWrapper from '../pages/UserPages/AdminSuriaPage';
import BudgetPage from '../pages/UserPages/BudgetPage';
import ProfilePage from '../pages/UserPages/ProfilePage';
import NewsPage from '../pages/UserPages/NewsPage';
import NuestraGente from '../pages/UserPages/NuestraGente';
import Recursos from '../pages/UserPages/Recursos';
import SuriaPage from '../pages/UserPages/Suria';
import ContactSuria from '../pages/UserPages/ContactSuria';
import NotFoundPage from '../pages/UserPages/NotFoundPage';

// ── Router Guards ─────────────────────────────────────────────
import ProtectedRoute from './ProtectedRoute';

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
      // ── Public Routes ─────────────────────────────────────
      { path: '/',              element: <HomeUsers /> },
      { path: '/noticias',      element: <NewsPage /> },
      { path: '/suria',         element: <SuriaPage /> },
      { path: '/nuestra-gente', element: <NuestraGente /> },
      { path: '/recursos',      element: <Recursos /> },
      { path: '/contacto',      element: <ContactSuria /> },
      { path: '/login',         element: <InicioSesion /> },
      { path: '/registro',      element: <RegistroUser /> },

      // ── Protected User Routes ─────────────────────────────
      {
        path: '/presupuesto',
        element: <ProtectedRoute />,
        children: [
          { path: '',       element: <BudgetPage /> },
          { path: 'perfil', element: <ProfilePage /> },
        ],
      },
      {
        path: '/financiamiento',
        element: <ProtectedRoute />,
        children: [
          { path: '',       element: <SuriaCatalogPage /> },
          { path: ':id',    element: <SuriaDetailPage /> },
          { path: 'perfil', element: <ProfilePage /> },
        ],
      },
      {
        path: '/perfil',
        element: <ProtectedRoute />,
        children: [
          { path: '', element: <ProfilePage /> },
        ],
      },

      // ── Admin Routes ──────────────────────────────────────
      {
        path: '/admin',
        element: <ProtectedRoute adminOnly />,
        children: [
          { path: '',                              element: <AdminDashboard /> },
          { path: 'dashboard',                     element: <AdminDashboard /> },
          { path: 'usuarios',                      element: <ManejarClientes /> },
          { path: 'clientes',                      element: <ManejarClientes /> },
          { path: 'presupuesto',                   element: <ManejoPresupuesto /> },
          { path: 'inventario',                    element: <ManejoInventario /> },
          { path: 'noticias',                      element: <GestionTipsNoticias /> },
          { path: 'solicitudes-contacto',          element: <GestionSolicitudes /> },
          { path: 'calificaciones',                element: <Calificaciones /> },
          { path: 'recursos',                      element: <GestionRecursos /> },
          { path: 'casos-exito',                   element: <GestionCasosExito /> },
          { path: 'configuraciones',               element: <Configuraciones /> },
          { path: 'configuraciones/notificaciones',element: <Notificaciones /> },
          { path: 'configuraciones/credenciales',  element: <CambioCredenciales /> },
          { path: 'configuraciones/roles',         element: <RolesPermisos /> },
          { path: 'mapa',                          element: <Maps /> },
          { path: 'financiamiento',                element: <AdminSuriaPageWrapper /> },
        ],
      },

      // ── 404 ───────────────────────────────────────────────
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;