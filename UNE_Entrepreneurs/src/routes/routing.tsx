// ============================================================
// Routing principal — UNE Costa Rica
// ============================================================
import { createBrowserRouter } from 'react-router-dom';
import HomeUsers from '../pages/UserPages/HomeUsers';
import InicioSesion from '../pages/UserPages/InicioSesion';
import RegistroUser from '../pages/UserPages/RegistroUser';
import UserFinancingCatalogPage from '../pages/FinancingPages/FinancingCatalogPage';
import FinancingDetailPage from '../pages/FinancingPages/FinancingDetailPage';
import AdminFinancingPage from '../pages/AdminPages/AdminFinancingPage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeUsers />,
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
      { path: '', element: <UserFinancingCatalogPage /> },
      { path: ':id', element: <FinancingDetailPage /> },
    ]
  },
  {
    path: '/admin',
    element: <ProtectedRoute adminOnly />, // Solo admins
    children: [
      { path: 'financiamiento', element: <AdminFinancingPage /> },
    ]
  },
]);

export default router;
