import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { getNews } from '../../services/NewsService';
import type { Noticia } from '../AdminComponents/GestionTipsNoticias';
import './NewsCarousel.css';
import Swal from 'sweetalert2';

export default function NewsCarousel() {
  const [news, setNews] = useState<Noticia[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        // Filter by active status, then sort by date (descending) and take latest 4
        const sorted = (data || [])
          .filter((n: Noticia) => n.activa)
          .sort((a, b) => new Date(b.fecha || 0).getTime() - new Date(a.fecha || 0).getTime())
          .slice(0, 4);
        setNews(sorted);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5 seconds auto-scroll
    return () => clearInterval(interval);
  }, [currentIndex, news]);

  const handlePrev = () => {
    setCurrentIndex((prev: number) => (prev === 0 ? news.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev: number) => (prev === news.length - 1 ? 0 : prev + 1));
  };

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

  if (loading) return <div className="news-carousel-loading">Cargando noticias...</div>;
  if (news.length === 0) return null;

  const currentItem = news[currentIndex];

  return (
    <div 
      className="news-carousel-container"
      onMouseEnter={() => {}} // Could be used to pause if refactored to a ref-based timer
    >
      <div className="carousel-track">
        <div className="carousel-slide">
          <div className="slide-image">
            <img 
              src={currentItem.imagen} 
              alt={currentItem.titulo} 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1504711432869-efd597cdd045?q=80&w=2670&auto=format&fit=crop';
              }}
            />
            <div className="image-overlay"></div>
          </div>
          <div className="slide-content">
            <span className="slide-tag">LO ÚLTIMO</span>
            <h2>{currentItem.titulo}</h2>
            <p style={{ 
              display: '-webkit-box', 
              WebkitLineClamp: 3, 
              WebkitBoxOrient: 'vertical', 
              overflow: 'hidden',
              textOverflow: 'ellipsis' 
            }}>{currentItem.contenido}</p>
            <div className="slide-meta">
              <span><User size={14} /> {currentItem.autor}</span>
              <span><Calendar size={14} /> {new Date(currentItem.fecha || '').toLocaleDateString()}</span>
            </div>
            <button className="btn-read-more" onClick={() => handleReadMore(currentItem)}>Leer más</button>
          </div>
        </div>
      </div>

      <div className="carousel-controls">
        <button className="control-btn prev" onClick={handlePrev}><ChevronLeft size={24} /></button>
        <button className="control-btn next" onClick={handleNext}><ChevronRight size={24} /></button>
      </div>

      <div className="carousel-indicators">
        {news.map((_: any /* eslint-disable-line @typescript-eslint/no-explicit-any */, i: number) => (
          <div 
            key={i} 
            className={`indicator ${i === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
