import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import NewsHero from '../../components/News/NewsHero/NewsHero';
import NewsFeed from '../../components/News/NewsFeed/NewsFeed';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />
      <main className="container" style={{ paddingTop: 'min(120px, 15vh)', paddingBottom: '80px' }}>
        <div style={{ marginBottom: '3rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginBottom: '1rem' }}
          >
            <ArrowLeft size={18} /> Volver al Inicio
          </button>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--suria-crimson)', margin: 0 }}>Actualidad UNE</h1>
          <p style={{ color: '#64748b', fontSize: '1.15rem', marginTop: '0.5rem' }}>Noticias, consejos y novedades para el ecosistema emprendedor.</p>
        </div>
        <NewsHero />
        <NewsFeed />
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
