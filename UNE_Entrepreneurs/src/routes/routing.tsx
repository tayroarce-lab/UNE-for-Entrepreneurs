// ============================================================
// Routing principal — UNE Costa Rica
// ============================================================
import { createBrowserRouter } from 'react-router-dom';
import UserFinancingCatalog from '../pages/UserPages/FinancingCatalog';
import FinancingDetail from '../pages/UserPages/FinancingDetail';
import AdminFinancingPage from '../pages/AdminPages/AdminFinancing';
import LoginPage from '../pages/UserPages/LoginPage';

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
