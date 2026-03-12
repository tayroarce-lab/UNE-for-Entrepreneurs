// ============================================================
// Routing principal — UNE Costa Rica
// ============================================================
import { createBrowserRouter } from 'react-router-dom';
import UserFinancingCatalog from '../components/Financing/FinancingCatalog';
import FinancingDetail from '../components/Financing/FinancingDetail';
import AdminFinancingPage from '../components/Financing/AdminFinancing';
import LoginPage from '../components/Financing/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserFinancingCatalog />,
  },
  {
    path: '/financiamiento',
    element: <UserFinancingCatalog />,
  },
  {
    path: '/financiamiento/:id',
    element: <FinancingDetail />,
  },
  {
    path: '/admin/financiamiento',
    element: <AdminFinancingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default router;
