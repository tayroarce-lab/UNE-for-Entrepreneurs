import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import { getRecursos } from '../../services/RecursosService';
import type { Recurso } from '../../services/RecursosService';
import { ExternalLink, FileText, Loader, BookOpen, PenTool, Layout, Video, HelpCircle } from 'lucide-react';
import '../../styles/Recursos.css';

const RecursosPage: React.FC = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRecursos();
  }, []);

  const fetchRecursos = async () => {
    try {
      const data = await getRecursos();
      // Filtrar solo los activos
      setRecursos(data.filter(r => r.activo) || []);
    } catch (error) {
      console.error('Error al cargar recursos:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="recursos-page">
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <section className="recursos-hero">
            <div className="container">
                <h1>Recursos para <span>Emprendedores</span></h1>
                <p>Descarga guías prácticas, plantillas de gestión y accede a trámites directos para formalizar y escalar tu negocio.</p>
            </div>
        </section>

        <section className="recursos-container">
          {loading ? (
             <div style={{ textAlign: 'center', padding: '100px 0', color: '#8B1A1A' }}>
                <Loader className="animate-spin" size={60} />
                <p style={{ marginTop: '20px', fontWeight: 700, fontSize: '1.2rem' }}>Sincronizando biblioteca de recursos...</p>
             </div>
          ) : recursos.length > 0 ? (
            <div className="recursos-grid-user">
              {recursos.map(recurso => (
                <article key={recurso.id} className="recurso-card-user">
                  <div className="recurso-icon-bg">
                    {getIcon(recurso.tipo)}
                  </div>
                  <span className="recurso-user-type">{recurso.tipo}</span>
                  <h3 className="recurso-user-title">{recurso.titulo}</h3>
                  <p className="recurso-user-desc">{recurso.descripcion}</p>
                  
                  <a href={recurso.enlace} target="_blank" rel="noopener noreferrer" className="recurso-user-btn">
                     <ExternalLink size={20} />
                     Ver Recurso Completo
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-recursos">
              <FileText size={80} style={{ color: '#cbd5e1', marginBottom: '20px' }} />
              <h2 style={{ color: '#1e293b', fontSize: '2rem', fontWeight: 800 }}>Próximamente más contenido</h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Estamos trabajando en nuevas guías y herramientas para tu crecimiento.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RecursosPage;
