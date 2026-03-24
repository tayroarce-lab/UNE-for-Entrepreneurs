import React, { useState, useEffect } from 'react';
import { Calendar, User, Search, ArrowUpDown, ArrowDown, ArrowUp, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { getNews } from '../../../services/NewsService';
import type { Noticia } from '../../AdminComponents/GestionTipsNoticias';
import styles from './NewsFeed.module.css';

type SortOrder = 'newest' | 'oldest';

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<Noticia[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [loading, setLoading] = useState(true);

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
          <div style="font-size: 1.1rem; line-height: 1.6; color: #334155;">${noticia.contenido}</div>
        </div>
      `,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: 'var(--suria-crimson)',
      width: '800px',
      showCloseButton: true,
    });
  };

  return (
    <>
      {/* Filter bar */}
      <div className={styles.wrapper}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className={styles.clearBtn}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className={styles.sortGroup}>
          <span className={styles.sortLabel}><ArrowUpDown size={14} /> Ordenar por:</span>
          <button
            onClick={() => setSortOrder('newest')}
            className={`${styles.sortBtn} ${sortOrder === 'newest' ? styles.sortBtnActive : ''}`}
          >
            <ArrowDown size={14} /> Más reciente
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`${styles.sortBtn} ${sortOrder === 'oldest' ? styles.sortBtnActive : ''}`}
          >
            <ArrowUp size={14} /> Más antigua
          </button>
        </div>

        <span className={styles.count}>
          {filteredNews.length} {filteredNews.length === 1 ? 'noticia' : 'noticias'}
        </span>
      </div>

      {/* Results */}
      {loading ? (
        <div className={styles.loading}>Cargando mural de novedades...</div>
      ) : filteredNews.length === 0 ? (
        <div className={styles.empty}>
          <h3>No se encontraron noticias que coincidan con su búsqueda.</h3>
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className={styles.clearSearchBtn}>
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredNews.map(n => (
            <article key={n.id} className={styles.card}>
              <div className={styles.cardImage}>
                <img
                  src={n.imagen && n.imagen.startsWith('http') ? n.imagen : 'https://images.unsplash.com/photo-1504711432869-efd597cdd045?q=80&w=2670&auto=format&fit=crop'}
                  alt={n.titulo}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711432869-efd597cdd045?q=80&w=2670&auto=format&fit=crop';
                  }}
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span><Calendar size={14} /> {n.fecha ? new Date(n.fecha).toLocaleDateString('es-CR', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</span>
                  <span><User size={14} /> {n.autor}</span>
                </div>
                <h2 className={styles.cardTitle}>{n.titulo}</h2>
                <p className={styles.cardExcerpt}>{n.contenido}</p>
                <button onClick={() => handleReadMore(n)} className={styles.readMoreBtn}>
                  Leer Completo
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default NewsFeed;
