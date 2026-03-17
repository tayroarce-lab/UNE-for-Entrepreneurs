// ============================================================
// Routing principal — UNE Costa Rica
// ============================================================
import { createBrowserRouter } from 'react-router-dom';
import HomeUsers from '../pages/UserPages/HomeUsers';
import InicioSesion from '../pages/UserPages/InicioSesion';
import RegistroUser from '../pages/UserPages/RegistroUser';
import FinancingCatalogPage from '../pages/UserPages/FinancingCatalogPage';
import FinancingDetailPage from '../pages/UserPages/FinancingDetailPage';
import AdminFinancingPageWrapper from '../pages/UserPages/AdminFinancingPage';
import ProtectedRoute from './ProtectedRoute';
import BudgetPage from '../pages/UserPages/BudgetPage';
import IngresosEgresos from '../components/IngresosEgresos/IngresosEgresos';
import NotFoundPage from '../pages/UserPages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeUsers />,
  },
  {
    path: '/finanzas',
    element: <IngresosEgresos />,
  },
  {
    path: '/presupuesto',
    element: <ProtectedRoute />, // Solo usuarios logueados
    children: [
      { path: '', element: <BudgetPage /> },
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
      { path: '', element: <FinancingCatalogPage /> },
      { path: ':id', element: <FinancingDetailPage /> },
    ]
  },
  {
    path: '/admin',
    element: <ProtectedRoute adminOnly />, // Solo admins
    children: [
      { path: 'financiamiento', element: <AdminFinancingPageWrapper /> },
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />,
  }
]);

export default router;
