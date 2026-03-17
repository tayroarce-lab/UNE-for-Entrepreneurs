import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import NavbarUsers from '../../components/UserComponents/NavbarUsers';
import FooterUsers from '../../components/UserComponents/FooterUsers';

export default function NotFoundPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavbarUsers />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ color: 'var(--color-accent)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <AlertCircle size={64} />
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--color-dark)' }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-dark)' }}>Página no encontrada</h2>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Verifica la URL o vuelve al inicio.
          </p>
          <Link to="/" className="btn-register" style={{ textDecoration: 'none', background: 'var(--color-primary)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '50px', fontWeight: 600 }}>
            Volver al Inicio
          </Link>
        </div>
      </main>
      <FooterUsers />
    </div>
  );
}
