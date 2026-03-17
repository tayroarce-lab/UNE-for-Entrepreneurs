import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeUsers from '../pages/UserPages/HomeUsers';
import InicioSesion from '../pages/UserPages/InicioSesion';
import RegistroUser from '../pages/UserPages/RegistroUser';
import FinancingCatalogPage from '../pages/UserPages/FinancingCatalogPage';
import FinancingDetailPage from '../pages/UserPages/FinancingDetailPage';
import AdminFinancingPageWrapper from '../pages/UserPages/AdminFinancingPage';
import BudgetPage from '../pages/UserPages/BudgetPage';
import PrivateRoutes from './PrivateRoutes';
import NotFoundPage from '../pages/UserPages/NotFoundPage';

/**
 * Routing: Configuración central de las rutas de la aplicación.
 * Conecta las páginas (Pages) con sus respectivas rutas URL.
 */
export default function Routing() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<HomeUsers />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/registro" element={<RegistroUser />} />
        <Route path="/financiamiento" element={<FinancingCatalogPage />} />
        <Route path="/financiamiento/:id" element={<FinancingDetailPage />} />

        {/* Rutas Privadas / Protegidas */}
        <Route element={<PrivateRoutes />}>
          <Route path="/admin/financiamiento" element={<AdminFinancingPageWrapper />} />
          <Route path="/presupuesto" element={<BudgetPage />} />
        </Route>

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}