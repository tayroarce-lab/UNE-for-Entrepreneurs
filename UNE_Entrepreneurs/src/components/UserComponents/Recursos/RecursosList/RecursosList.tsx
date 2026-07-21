import React, { useEffect, useState } from 'react';
import { getRecursos } from '../../../../services/RecursosService';
import type { Recurso } from '../../../../types/recurso';
import RecursoCard from '../RecursoCard/RecursoCard';
import RecursosLoading from '../RecursosLoading/RecursosLoading';
import RecursosEmpty from '../RecursosEmpty/RecursosEmpty';
import styles from './RecursosList.module.css';

const RecursosList: React.FC = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecursos();
  }, []);

  const fetchRecursos = async () => {
    try {
      const data = await getRecursos();
      setRecursos(data.filter(r => r.activo) || []);
    } catch (error) {
      console.error('Error al cargar recursos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <RecursosLoading />;
  
  if (recursos.length === 0) return <RecursosEmpty />;

  return (
    <section className={styles.recursosContainer}>
      <div className={styles.recursosGridUser}>
        {recursos.map(recurso => (
          <RecursoCard key={recurso.id} recurso={recurso} />
        ))}
      </div>
    </section>
  );
};

export default RecursosList;
