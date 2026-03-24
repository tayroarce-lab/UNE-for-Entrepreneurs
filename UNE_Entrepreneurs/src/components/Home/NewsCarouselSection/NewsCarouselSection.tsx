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
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <Newspaper className={styles.titleIcon} size={42} /> {title}
          </h2>
        </div>
      </div>
      <NewsCarousel />
    </section>
  );
};

export default NewsCarouselSection;
