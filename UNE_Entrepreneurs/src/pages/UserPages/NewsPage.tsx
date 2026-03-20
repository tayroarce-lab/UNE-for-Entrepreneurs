import { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Footer from '../../components/Shared/Footer';
import { getNews } from '../../services/NewsService';
import type { Noticia } from '../../components/AdminComponents/GestionTipsNoticias';
import { Calendar, User, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function NewsPage() {
  const [news, setNews] = useState<Noticia[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const data = await getNews();
        setNews(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNews();
  }, []);

  const filteredNews = news
    .filter(n => n.activa)
    .filter(n => 
      n.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
      n.contenido?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleReadMore = (noticia: Noticia) => {
    Swal.fire({
      title: noticia.titulo,
      html: `
        <div style="text-align: left; font-family: 'DM Sans', sans-serif;">
          <img src="${noticia.imagen || 'https://images.unsplash.com/photo-1504711432869-efd597cdd045?q=80&w=2670&auto=format&fit=crop'}" 
               style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; margin-bottom: 20px;" 
               onerror="this.src='https://images.unsplash.com/photo-1504711432869-efd597cdd045?q=80&w=2670&auto=format&fit=crop'"
          />
          <div style="display: flex; gap: 15px; font-size: 0.8rem; color: #64748b; margin-bottom: 20px; font-weight: 600;">
            <span>📅 ${noticia.fecha ? new Date(noticia.fecha).toLocaleDateString() : 'N/A'}</span>
            <span>👤 ${noticia.autor}</span>
          </div>
          <div style="font-size: 1.1rem; line-height: 1.6; color: #334155;">
            ${noticia.contenido}
          </div>
        </div>
      `,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: 'var(--uneRed)',
      width: '800px',
      showCloseButton: true,
      customClass: {
        container: 'swal2-news-modal'
      }
    });
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />

      <main className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <button 
              onClick={() => navigate('/')} 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginBottom: '1rem' }}
            >
              <ArrowLeft size={18} /> Volver al Inicio
            </button>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--uneRed)', margin: 0 }}>Actualidad UNE</h1>
            <p style={{ color: '#64748b', fontSize: '1.15rem' }}>Noticias, consejos y novedades para el ecosistema emprendedor.</p>
          </div>

          <div style={{ position: 'relative', minWidth: '300px' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Buscar noticias..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '0.8rem 1rem 0.8rem 3rem', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%', fontSize: '1rem', outline: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#64748b' }}>Cargando mural de novedades...</div>
        ) : filteredNews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#64748b', background: '#fff', borderRadius: '24px' }}>
            <h3>No se encontraron noticias que coincidan con su búsqueda.</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {filteredNews.map(n => (
              <article key={n.id} style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease' }}>
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img 
                    src={n.imagen && n.imagen.startsWith('http') ? n.imagen : n.imagen || 'https://images.unsplash.com/photo-1504711432869-efd597cdd045?q=80&w=2670&auto=format&fit=crop'} 
                    alt={n.titulo} 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1504711432869-efd597cdd045?q=80&w=2670&auto=format&fit=crop';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', gap: '15px', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> {n.fecha ? new Date(n.fecha).toLocaleDateString() : 'N/A'}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={14} /> {n.autor}</span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '1rem', lineHeight: '1.3' }}>{n.titulo}</h2>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {n.contenido}
                  </p>
                  <button 
                    onClick={() => handleReadMore(n)}
                    style={{ background: 'var(--uneGold)', color: '#000', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    Leer Completo
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
