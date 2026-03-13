<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeUsers from '../pages/UserPages/HomeUsers';
import InicioSesion from '../pages/UserPages/InicioSesion';
import RegistroUser from '../pages/UserPages/RegistroUser';

/**
 * Routing: Configuración central de las rutas de la aplicación.
 * Conecta las páginas (Pages) con sus respectivas rutas URL.
 */
export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeUsers />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/registro" element={<RegistroUser />} />
        {/* Aquí puedes añadir más rutas como /nosotros, /contacto, etc. */}
      </Routes>
    </Router>
  );
}
=======
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
>>>>>>> dev
