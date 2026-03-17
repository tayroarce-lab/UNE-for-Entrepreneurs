import { useNavigate } from 'react-router-dom'
import {
  Target, Lightbulb, Building2, BarChart3,
  ClipboardList, BookOpen, TrendingUp, Scale,
  Check, MapPin, Map, ArrowRight
} from 'lucide-react'
import Navbar from '../Shared/Navbar'
import Footer from '../Shared/Footer'
import { useAuth } from '../../context/AuthContext'
import heroImage from '../../assets/hero_une.jpg'

/**
 * EstructuraHome: Componente que ensambla la página principal.
 * Cada sección tiene un id para navegación por scroll desde el Navbar.
 * Los botones del Hero y CTA navegan a las secciones o rutas correspondientes.
 */
export default function EstructuraHome() {
  const navigate = useNavigate();

  /** Scroll suave a una sección por su id */
  const { user } = useAuth();

  return (
    <div className="home-page-layout">
      <Navbar />

      <main className="home-main-content">

        {/* ── HERO SECTION ── */}
        <section id="inicio" className="hero-section">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-text">
                <span className="hero-badge">
                  <Target size={16} style={{ marginRight: '8px' }} />
                  Aliados Emprendedores 2026
                </span>
                <h1>Empoderando al Emprendedor Universitario</h1>
                <p>
                  Únete a UNE Entrepreneurs, la plataforma que impulsa tus proyectos
                  con herramientas financieras, mentoría y una red de contactos
                  diseñada para hacer crecer tu negocio.
                </p>
                <div className="hero-buttons">
                  <button
                    className="btn-primary"
                    onClick={() => {
                      if (user) {
                        navigate('/financiamiento');
                      } else {
                        const el = document.getElementById('catalogo');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Ver Catálogo <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      const el = document.getElementById('noticias');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Saber más
                  </button>
                </div>
              </div>
              <div className="hero-image">
                <div className="hero-image-placeholder" style={{ background: 'none', border: 'none' }}>
                  <img 
                    src={heroImage} 
                    alt="Aliados Emprendedores UNE" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-xl)'
                    }} 
                  />
                  <div className="hero-stat-card">
                    <div className="stat-number">+15k</div>
                    <div className="stat-text">Emprendedores beneficiados<br/>desde su fundación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NOTICIAS Y CONSEJOS ── */}
        <section id="noticias" className="news-section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2>Noticias y Consejos</h2>
                <p>Todo lo que necesitas saber para hacer crecer tu capital</p>
              </div>
              <a href="#noticias" onClick={(e) => e.preventDefault()} className="view-all">
                Ver todas las noticias <ArrowRight size={16} />
              </a>
            </div>
            <div className="news-grid">
              <div className="news-card">
                <div className="news-card-img"><Lightbulb size={40} /></div>
                <div className="news-card-body">
                  <span className="news-card-tag">Finanzas</span>
                  <h3>Tips para mejorar tu historial crediticio</h3>
                  <p>Aprende a construir un historial financiero sólido desde temprana edad.</p>
                  <a href="#" onClick={(e) => e.preventDefault()} className="news-card-link">
                    Leer artículo <ArrowRight size={14} />
                  </a>
                </div>
              </div>
              <div className="news-card">
                <div className="news-card-img"><Building2 size={40} /></div>
                <div className="news-card-body">
                  <span className="news-card-tag">Créditos</span>
                  <h3>Nuevas líneas de crédito 2026</h3>
                  <p>Explora las opciones de financiamiento con tasas preferenciales para emprendedores.</p>
                  <a href="#" onClick={(e) => e.preventDefault()} className="news-card-link">
                    Leer artículo <ArrowRight size={14} />
                  </a>
                </div>
              </div>
              <div className="news-card">
                <div className="news-card-img"><BarChart3 size={40} /></div>
                <div className="news-card-body">
                  <span className="news-card-tag">Tecnología</span>
                  <h3>Digitaliza tu inventario</h3>
                  <p>Por qué la digitalización es clave para reducir costos operativos.</p>
                  <a href="#" onClick={(e) => e.preventDefault()} className="news-card-link">
                    Leer artículo <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── RECURSOS PARA EMPRENDEDORES (CATÁLOGO) ── */}
        <section id="catalogo" className="features-section">
          <div className="container">
            <h2 className="section-title">Recursos para Emprendedores</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon"><ClipboardList size={32} /></div>
                <h3>Calculadora de Costos</h3>
                <p>Planifica tus gastos iniciales con precisión.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><BookOpen size={32} /></div>
                <h3>Guías de Negocio</h3>
                <p>Manuales paso a paso para tu emprendimiento.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><TrendingUp size={32} /></div>
                <h3>Análisis de Mercado</h3>
                <p>Datos y tendencias para tomar decisiones informadas.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Scale size={32} /></div>
                <h3>Asesoría Legal</h3>
                <p>Consultas sobre registro y formalización de empresas.</p>
            </div>
          </div>
            
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <button
              className="btn-primary"
              onClick={() => navigate('/financiamiento')}
              style={{ padding: '1rem 2.8rem', borderRadius: 'var(--radius-xl)' }}
            >
              Explorar Todos los Recursos y Financiamiento <ArrowRight size={20} style={{ marginLeft: '10px' }} />
            </button>
          </div>
        </div>
      </section>

        {/* ── CTA EXCLUSIVO ── */}
        <section id="cta" className="cta-section">
          <div className="container">
            <div className="cta-inner">
              <div className="cta-text">
                <h2>Exclusivo: Sistema de Finanzas y Gestión de Inventario</h2>
                <p>
                  Controla tus ventas, stock y flujo de caja en tiempo real.
                  Una herramienta gratuita para catapultar tu negocio con datos reales.
                </p>
                <button
                  className="btn-cta"
                  onClick={() => navigate('/finanzas')}
                >
                  Comenzar <Check size={20} style={{ marginLeft: '8px' }} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECCIÓN INFORMATIVA / CONTACTO ── */}
        <section id="contacto" className="info-section">
          <div className="container">
            <h2>Nuestras Sedes UNE</h2>
            <div className="info-grid">
              <div className="info-list">
                <div className="info-item">
                  <div className="info-item-icon"><MapPin size={24} /></div>
                  <div className="info-item-text">
                    <h4>Sede Central</h4>
                    <p>Campus Universitario Principal</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item-icon"><MapPin size={24} /></div>
                  <div className="info-item-text">
                    <h4>Centro de Innovación</h4>
                    <p>Edificio de Emprendimiento, 2do piso</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item-icon"><MapPin size={24} /></div>
                  <div className="info-item-text">
                    <h4>Laboratorio de Ideas</h4>
                    <p>Biblioteca Central, Sala B</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-item-icon"><MapPin size={24} /></div>
                  <div className="info-item-text">
                    <h4>Coworking UNE</h4>
                    <p>Espacio abierto para proyectos colaborativos</p>
                  </div>
                </div>
              </div>
              <div className="info-map-placeholder">
                <Map size={80} color="rgba(0,0,0,0.1)" />
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
