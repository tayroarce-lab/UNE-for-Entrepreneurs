import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Navbar from '../../components/Shared/Navbar';
import Footer from '../../components/Shared/Footer';

export default function NotFoundPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ color: 'var(--uneRed, #8B1A1A)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <AlertCircle size={80} strokeWidth={1.5} />
          </div>
          <h1 style={{ fontSize: '6rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.5rem', color: '#1e293b' }}>404</h1>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b' }}>Página no encontrada</h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            Lo sentimos, el recurso que buscas no está disponible o ha sido movido. 
            Verifica la dirección o regresa a nuestro portal de emprendimiento.
          </p>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              background: 'var(--uneRed, #8B1A1A)', 
              color: '#fff', 
              padding: '0.875rem 2rem', 
              borderRadius: '12px', 
              fontWeight: 700,
              display: 'inline-block',
              boxShadow: '0 10px 15px -3px rgba(139, 26, 26, 0.3)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Volver al Inicio
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
