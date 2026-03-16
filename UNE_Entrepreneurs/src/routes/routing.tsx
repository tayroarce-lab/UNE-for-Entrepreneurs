// ============================================================
// Routing principal — UNE Costa Rica
// ============================================================
import { createBrowserRouter } from 'react-router-dom';
import HomeUsers from '../pages/UserPages/HomeUsers';
import InicioSesion from '../pages/UserPages/InicioSesion';
import RegistroUser from '../pages/UserPages/RegistroUser';
import UserFinancingCatalog from '../components/Financing/FinancingCatalog';
import FinancingDetail from '../components/Financing/FinancingDetail';
import AdminFinancingPage from '../components/Financing/AdminFinancing';

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
]);

export default router;
