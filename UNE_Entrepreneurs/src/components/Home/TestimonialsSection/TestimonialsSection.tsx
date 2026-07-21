import React from 'react';
import { Quote } from 'lucide-react';
import styles from './TestimonialsSection.module.css';
const marielosImg = '/assets/Marielos.png';
const katherineImg = '/assets/katherine.png';
const damarisImg = '/assets/Damaris.png';

interface Testimonial {
  id: number;
  name: string;
  profession: string;
  quote: string;
  image: string;
}

interface TestimonialsSectionProps {
  title?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marielos',
    profession: 'Cocinera / Bagaces',
    quote: 'Hoy estamos de fiesta por saber que las mujeres de Bagaces fueron escuchadas por UNE.',
    image: marielosImg
  },
  {
    id: 2,
    name: 'Katherine',
    profession: 'Panadera',
    quote: 'Esta ha sido una experiencia muy bonita, con compañeras muy buenas y una guía que está siempre presente.',
    image: katherineImg
  },
  {
    id: 3,
    name: 'Damaris',
    profession: 'Artesana',
    quote: 'Confiaron en mí y lo más bonito es ver cómo se realizan mis sueños, ver mi taller creciendo.',
    image: damarisImg
  }
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = 'Historias que inspiran',
  testimonials = defaultTestimonials
}) => {
  return (
    <section className={styles.testimonialsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <article key={t.id} className={styles.card}>
              <Quote className={styles.quoteIcon} size={50} />
              <blockquote className={styles.quoteText}>"{t.quote}"</blockquote>
              <div className={styles.authorArea}>
                <img src={t.image} alt={t.name} className={styles.authorImage} />
                <div>
                  <h4 className={styles.authorName}>{t.name}</h4>
                  <p className={styles.authorMeta}>{t.profession}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
