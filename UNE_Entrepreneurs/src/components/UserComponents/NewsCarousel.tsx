import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';
import { getNews } from '../../services/NewsService';
import type { Noticia } from '../AdminComponents/GestionTipsNoticias';
import styles from './NewsCarousel.module.css';
import Swal from 'sweetalert2';

const NewsCarousel: React.FC = () => {
  const [news, setNews] = useState<Noticia[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        const sorted = (data || [])
          .filter((n: Noticia) => n.activa)
          .sort((a, b) => new Date(b.fecha || 0).getTime() - new Date(a.fecha || 0).getTime())
          .slice(0, 5);
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
    }, 10000); 
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
        <div style="text-align: left; font-family: 'Nunito', sans-serif;">
          <img src="${noticia.imagen || 'https://images.unsplash.com/photo-1504711432869-efd597cdd045?q=80&w=2670&auto=format&fit=crop'}" 
               style="width: 100%; height: 350px; object-fit: cover; border-radius: 20px; margin-bottom: 24px;" 
               onerror="this.src='https://images.unsplash.com/photo-1504711432869-efd597cdd045?q=80&w=2670&auto=format&fit=crop'"
          />
          <div style="display: flex; gap: 20px; font-size: 0.85rem; color: #58331d; opacity: 0.7; margin-bottom: 24px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
            <span style="display: flex; align-items: center; gap: 6px;">📅 ${noticia.fecha ? new Date(noticia.fecha).toLocaleDateString() : 'N/A'}</span>
            <span style="display: flex; align-items: center; gap: 6px;">👤 ${noticia.autor}</span>
          </div>
          <div style="font-size: 1.1rem; line-height: 1.8; color: #58331d; letter-spacing: -0.2px;">
            ${noticia.contenido}
          </div>
        </div>
      `,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#a9262b',
      width: '850px',
      showCloseButton: true,
      customClass: {
        popup: 'modern-swal-popup',
      }
    });
  };

  if (loading) {
    return (
      <div className={styles.skeletonWrap}>
        <div className={styles.skeletonImg} />
        <div className={styles.skeletonContent}>
          <div className={styles.skeletonTag} />
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonTitleShort} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonLineShort} />
          <div className={styles.skeletonMeta} />
          <div className={styles.skeletonBtn} />
        </div>
      </div>
    );
  }
  
  if (news.length === 0) return null;

  const currentItem = news[currentIndex];

  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <div key={currentItem.id} className={styles.slide}>
          <div className={styles.imageArea}>
            <img 
              src={currentItem.imagen} 
              alt={currentItem.titulo} 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1504711432869-efd597cdd045?q=80&w=2670&auto=format&fit=crop';
              }}
            />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.content}>
            <span className={styles.tag}>Novedad</span>
            <h2 className={styles.title}>{currentItem.titulo}</h2>
            <p className={styles.description}>{currentItem.contenido}</p>
            <div className={styles.meta}>
              <span><User size={18} /> Por {currentItem.autor}</span>
              <span><Calendar size={18} /> {currentItem.fecha ? new Date(currentItem.fecha).toLocaleDateString('es-CR', { day: 'numeric', month: 'long' }) : 'N/A'}</span>
            </div>
            <button className={styles.readMore} onClick={() => handleReadMore(currentItem)}>
              Leer historia completa <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={handlePrev} aria-label="Anterior"><ChevronLeft size={28} /></button>
        <button className={styles.controlBtn} onClick={handleNext} aria-label="Siguiente"><ChevronRight size={28} /></button>
      </div>

      <div className={styles.indicators}>
        {news.map((item: Noticia, i: number) => (
          <div 
            key={item.id} 
            className={`${styles.indicator} ${i === currentIndex ? styles.indicatorActive : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsCarousel;

