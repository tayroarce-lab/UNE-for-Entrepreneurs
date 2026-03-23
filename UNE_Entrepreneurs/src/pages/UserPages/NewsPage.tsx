import { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Footer from '../../components/Shared/Footer';
import { getNews } from '../../services/NewsService';
import type { Noticia } from '../../components/AdminComponents/GestionTipsNoticias';
import { Calendar, User, ArrowLeft, Search, ArrowUpDown, ArrowDown, ArrowUp, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import avatarJaqueline from '../../assets/Jaqueline.png';
import avatarMaria from '../../assets/success_story_maria.png';

type SortOrder = 'newest' | 'oldest';

export default function NewsPage() {
  const [news, setNews] = useState<Noticia[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
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
    )
    .sort((a, b) => {
      const dateA = a.fecha ? new Date(a.fecha).getTime() : 0;
      const dateB = b.fecha ? new Date(b.fecha).getTime() : 0;
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

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

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginBottom: '1rem' }}
          >
            <ArrowLeft size={18} /> Volver al Inicio
          </button>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--uneRed)', margin: 0 }}>Actualidad UNE</h1>
          <p style={{ color: '#64748b', fontSize: '1.15rem', marginTop: '0.5rem' }}>Noticias, consejos y novedades para el ecosistema emprendedor.</p>
        </div>
        
        {/* ── SECCIÓN EMPRENDEDORA DESTACADA ── */}
        <section style={{ 
          background: 'linear-gradient(135deg, #4A1525 0%, #2D0D16 100%)', 
          borderRadius: '35px', 
          padding: '3rem', 
          marginBottom: '4rem',
          display: 'flex',
          gap: '3rem',
          alignItems: 'center',
          color: '#fff',
          boxShadow: '0 20px 50px rgba(74, 21, 37, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
          
          <div style={{ flex: '1 1 300px', maxWidth: '300px' }}>
            <img 
              src={avatarJaqueline} 
              alt="Jaqueline" 
              style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }} 
            />
          </div>
          
          <div style={{ flex: '1 1 500px' }}>
            <span style={{ background: 'rgba(212, 168, 83, 0.2)', color: '#D4A853', padding: '6px 15px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Emprendedora Destacada
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '1.5rem', marginBottom: '1.5rem' }}>Jaqueline: "El arte de crear sueños"</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.9, marginBottom: '2rem' }}>
              Conozca la historia de cómo Jaqueline transformó su pequeño taller de artesanía en una marca reconocida localmente. 
              Su perseverancia y el apoyo de la red UNE han sido fundamentales en este viaje.
            </p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
               <img src={avatarMaria} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #D4A853' }} alt="Maria" />
               <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>Entrevista por Maria Solano, UNE Colaboradora</p>
            </div>
          </div>
        </section>

        {/* ── FILTROS ── */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem 2rem', marginBottom: '3rem', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Buscador */}
          <div style={{ position: 'relative', flexGrow: 1, minWidth: '220px', maxWidth: '380px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Buscar noticias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '0.75rem 2.5rem 0.75rem 2.75rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', width: '100%', fontSize: '0.95rem', outline: 'none', boxShadow: 'none', transition: 'border 0.2s' }}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Ordenar por fecha */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowUpDown size={14} /> Ordenar por:
            </span>
            <button
              onClick={() => setSortOrder('newest')}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                background: sortOrder === 'newest' ? 'var(--uneRed)' : '#f1f5f9',
                color: sortOrder === 'newest' ? 'white' : '#64748b',
                border: sortOrder === 'newest' ? '1.5px solid var(--uneRed)' : '1.5px solid #e2e8f0',
              }}
            >
              <ArrowDown size={14} /> Más reciente
            </button>
            <button
              onClick={() => setSortOrder('oldest')}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                background: sortOrder === 'oldest' ? 'var(--uneRed)' : '#f1f5f9',
                color: sortOrder === 'oldest' ? 'white' : '#64748b',
                border: sortOrder === 'oldest' ? '1.5px solid var(--uneRed)' : '1.5px solid #e2e8f0',
              }}
            >
              <ArrowUp size={14} /> Más antigua
            </button>
          </div>

          {/* Contador de resultados */}
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>
            {filteredNews.length} {filteredNews.length === 1 ? 'noticia' : 'noticias'}
          </span>
        </div>
        {/* ── RESULTADOS ── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#64748b' }}>Cargando mural de novedades...</div>
        ) : filteredNews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#64748b', background: '#fff', borderRadius: '24px' }}>
            <h3>No se encontraron noticias que coincidan con su búsqueda.</h3>
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{ marginTop: '1rem', background: 'var(--uneRed)', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                Limpiar búsqueda
              </button>
            )}
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
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> {n.fecha ? new Date(n.fecha).toLocaleDateString('es-CR', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</span>
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
