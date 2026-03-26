import React from 'react';
import { Newspaper } from 'lucide-react';
import NewsCarousel from '../../UserComponents/NewsCarousel';
import styles from './NewsCarouselSection.module.css';

interface NewsCarouselSectionProps {
  title?: string;
}

const NewsCarouselSection: React.FC<NewsCarouselSectionProps> = ({
  title = 'Novedades UNE'
}) => {
  return (
    <section className={styles.newsCarouselSection}>
      <header className={styles.sectionHeader}>
        <div className={styles.titleWrapper}>
          <span className={styles.sectionBadge}>
            <Newspaper size={14} /> Blog & Noticias
          </span>
          <h2 className={styles.sectionTitle}>
             {title.split(' ')[0]} <span className={styles.titleAccent}>{title.split(' ')[1]}</span>
          </h2>
        </div>
      </header>
      <div className="container">
        <NewsCarousel />
      </div>
    </section>
  );
};

export default NewsCarouselSection;
