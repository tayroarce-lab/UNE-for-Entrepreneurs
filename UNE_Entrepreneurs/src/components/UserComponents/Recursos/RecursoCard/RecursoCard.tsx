import React from 'react';
import { ExternalLink, BookOpen, PenTool, Layout, Video, HelpCircle } from 'lucide-react';
import styles from './RecursoCard.module.css';
import type { Recurso } from '../../../../types/recurso';

interface RecursoCardProps {
  recurso: Recurso;
}

const RecursoCard: React.FC<RecursoCardProps> = ({ recurso }) => {
  const getIcon = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'guía': return <BookOpen size={60} />;
      case 'plantilla': return <PenTool size={60} />;
      case 'trámite': return <Layout size={60} />;
      case 'video': return <Video size={60} />;
      default: return <HelpCircle size={60} />;
    }
  };

  return (
    <article className={styles.recursoCardUser}>
      <div className={styles.recursoIconBg}>
        {getIcon(recurso.tipo)}
      </div>
      <span className={styles.recursoUserType}>{recurso.tipo}</span>
      <h3 className={styles.recursoUserTitle}>{recurso.titulo}</h3>
      <p className={styles.recursoUserDesc}>{recurso.descripcion}</p>
      
      <a 
        href={recurso.enlace} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.recursoUserBtn}
      >
        <ExternalLink size={20} />
        Ver Recurso Completo
      </a>
    </article>
  );
};

export default RecursoCard;
