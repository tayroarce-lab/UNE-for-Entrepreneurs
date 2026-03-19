import { useNavigate } from 'react-router-dom'
import {
  Target, ClipboardList, TrendingUp,
  Check, ArrowRight, BarChart3
} from 'lucide-react'
import SedeUbicacion from '../../components/Shared/SedeUbicacion'
import Navbar from '../../components/Shared/Navbar'
import Footer from '../../components/Shared/Footer'
import heroImage from '../../assets/hero_une.jpg'
import avatarCarlos from '../../assets/carlos_mendez.png'
import avatarLucia from '../../assets/lucia_mora.png'
import avatarEsteban from '../../assets/esteban_ruiz.png'
import NewsCarousel from '../../components/UserComponents/NewsCarousel'

export default function EstructuraHome() {
  const navigate = useNavigate();

  return (
    <div className="home-page-layout">
      <Navbar />

      <main className="home-main-content">
        {/* ── NOTICIAS DESTACADAS (FULL WIDTH) ── */}
        <section className="featured-news" style={{ padding: 0 }}>
          <NewsCarousel />
        </section>

        {/* ── HERO SECTION ── */}
        <section id="inicio" className="hero-section">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-text">
                <span className="hero-badge" style={{ background: 'rgba(139, 26, 26, 0.08)', color: 'var(--uneRed)', border: '1px solid rgba(139,26,26,0.1)' }}>
                  Aliados Estratégicos UNE Costa Rica
                </span>
                <h1 style={{ fontWeight: 800 }}>
                  Empoderando al <span className="highlight">Emprendedor</span> Costarricense
                </h1>
                <p>
                  Acceda a soluciones financieras diseñadas para el mercado local. 
                  Desde microcréditos hasta capital de trabajo, impulsamos su crecimiento 
                  con la agilidad que su negocio merece.
                </p>
                <div className="hero-buttons">
                  <button className="btn-primary" onClick={() => navigate('/financiamiento')}>
                    Explorar créditos
                  </button>
                  <button className="btn-secondary" style={{ borderColor: '#ddd', color: '#666' }}>
                    Saber Más
                  </button>
                </div>
              </div>

              <div className="hero-image">
                <div className="hero-image-v2">
                  <img src={heroImage} alt="Emprendedor UNE" />
                  <div className="hero-stat-overlay">
                    <div className="icon"><BarChart3 size={20} /></div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>CRECIMIENTO PROMEDIO</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-success)' }}>+24% Anual</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="stats-bar">
          <div className="container">
            <div className="stats-grid-v2">
              <div className="stat-item-v2">
                <h3>15k+</h3>
                <p>PYMES EN LA RED</p>
              </div>
              <div className="stat-item-v2">
                <h3>92%</h3>
                <p>TASA DE ÉXITO</p>
              </div>
              <div className="stat-item-v2">
                <h3>$45M</h3>
                <p>CAPITAL INVERTIDO</p>
              </div>
              <div className="stat-item-v2">
                <h3>24h</h3>
                <p>APROBACIÓN RÁPIDA</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ── */}
        <section id="noticias" className="how-works-section">
          <div className="container">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Cómo Funciona</h2>
            <p style={{ color: '#64748b' }}>Su camino al éxito en tres simples pasos.</p>
            
            <div className="how-works-grid">
              <div className="work-step">
                <div className="step-icon"><ClipboardList size={32} /></div>
                <h3 style={{ marginBottom: '0.5rem' }}>Regístrate</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Cree su perfil empresarial en menos de 5 minutos con requisitos mínimos.</p>
              </div>
              <div className="work-step">
                <div className="step-icon"><Target size={32} /></div>
                <h3 style={{ marginBottom: '0.5rem' }}>Compara</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Analice entre decenas de soluciones bancarias y seleccione la que mejor se adapte a su flujo.</p>
              </div>
              <div className="work-step">
                <div className="step-icon"><TrendingUp size={32} /></div>
                <h3 style={{ marginBottom: '0.5rem' }}>Crece</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Reciba los fondos y comience a escalar su negocio con el respaldo de la red UNE.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINANCIAMIENTO SHOWCASE ── */}
        <section id="catalogo" className="financing-showcase">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
               <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Financiamiento a tu Medida</h2>
                <p style={{ color: '#64748b' }}>Soluciones capitales para cada etapa de su empresa.</p>
               </div>
               <button onClick={() => navigate('/financiamiento')} style={{ border: 'none', background: 'none', color: '#8B1A1A', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Ver todos los créditos <ArrowRight size={18} />
               </button>
            </div>

            <div className="showcase-grid">
              <div className="showcase-card gray">
                <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#fff', padding: '4px 12px', borderRadius: '50px', marginBottom: '1rem', display: 'inline-block' }}>BANCO NACIONAL</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Crédito Pyme</h3>
                <p style={{ fontSize: '0.9rem', color: '#444', marginBottom: '2rem' }}>Hasta ₡15.000.000 para expansión, maquinaria o locales comerciales.</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', fontWeight: 700 }}>
                  <span>✓ Tasa Fija</span>
                  <span>✓ Plazos Flexibles</span>
                </div>
                <button className="btn-plus" style={{ position: 'absolute', bottom: '2rem', right: '2.5rem', width: '40px', height: '40px', borderRadius: '12px', background: '#000', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Ir a catálogo"><ArrowRight size={20} /></button>
              </div>
              <div className="showcase-card blue">
                <span style={{ fontSize: '0.7rem', fontWeight: 800, background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '50px', marginBottom: '1rem', display: 'inline-block' }}>COOPEMEX</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Capital de Trabajo</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '2rem' }}>Liquidez inmediata para inventario o pago de planillas en tiempo récord.</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', fontWeight: 700 }}>
                  <span>✓ Sin Garantía Real</span>
                  <span>✓ Desembolso 48h</span>
                </div>
                <button className="btn-plus" style={{ position: 'absolute', bottom: '2rem', right: '2.5rem', width: '40px', height: '40px', borderRadius: '12px', background: '#fff', color: '#8B1A1A', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Ir a catálogo"><ArrowRight size={20} /></button>
              </div>
            </div>

            <div style={{ marginTop: '2rem', background: '#fff', padding: '1.5rem 2.5rem', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
               <div>
                  <h4 style={{ fontWeight: 800 }}>Microcréditos UNE</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Pequeños impulsos para emprendedores jóvenes, ideales para emprendimientos individuales o startups locales.</p>
               </div>
               <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                     <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>MONTO MAX</div>
                     <div style={{ fontWeight: 800 }}>₡3M</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                     <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>INTERÉS</div>
                     <div style={{ fontWeight: 800 }}>6.5%*</div>
                  </div>
                  <button className="btn-primary" onClick={() => navigate('/financiamiento')} style={{ padding: '0.75rem 1.5rem' }}>Solicitar Ahora</button>
               </div>
            </div>
          </div>
        </section>

        {/* ── BUSINESS CONTROL ── */}
        <section id="mi-panel" className="business-control">
          <div className="container">
            <div className="business-inner">
               <div className="business-text">
                  <span style={{ color: '#D4A853', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px' }}>EXCLUSIVO PARA MIEMBROS</span>
                  <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', margin: '1rem 0' }}>Tu Negocio <span>Bajo Control</span></h2>
                  <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                    Presentamos el Sistema UNE de Finanzas e Inventario. Controle sus cuentas, 
                    ventas y stock de forma automática, sin complicaciones.
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#fff', marginBottom: '3rem' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ background: '#8B1A1A', borderRadius: '50%', padding: '4px', display: 'flex' }}><Check size={14} /></div> Gestión inteligente de flujo de caja</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ background: '#8B1A1A', borderRadius: '50%', padding: '4px', display: 'flex' }}><Check size={14} /></div> Control de inventario con alertas automáticas.</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ background: '#8B1A1A', borderRadius: '50%', padding: '4px', display: 'flex' }}><Check size={14} /></div> Integrado directamente con su perfil de créditos.</li>
                  </ul>
                  <button className="btn-cta" style={{ background: '#8B1A1A' }} onClick={() => navigate('/presupuesto')}>
                    Activar Gestión Gratis
                  </button>
               </div>
               <div className="dashboard-preview">
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
                     <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                     <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fbbf24' }}></div>
                     <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></div>
                  </div>
                  <div style={{ background: '#2d2d2d', borderRadius: '12px', padding: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ background: '#3b3b3b', padding: '1rem', borderRadius: '10px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#D4A853', fontWeight: 700 }}>VENTAS TOTALES</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>₡15.4M</div>
                      </div>
                      <div style={{ background: '#3b3b3b', padding: '1rem', borderRadius: '10px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 700 }}>GASTOS</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>₡8.2M</div>
                      </div>
                    </div>
                    <div style={{ height: '120px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                       <div style={{ height: '40%', width: '100%', background: '#D4A853', borderRadius: '4px' }}></div>
                       <div style={{ height: '60%', width: '100%', background: '#D4A853', borderRadius: '4px' }}></div>
                       <div style={{ height: '80%', width: '100%', background: '#D4A853', borderRadius: '4px' }}></div>
                       <div style={{ height: '50%', width: '100%', background: '#D4A853', borderRadius: '4px' }}></div>
                       <div style={{ height: '90%', width: '100%', background: '#D4A853', borderRadius: '4px' }}></div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* ── HISTORIAS DE ÉXITO ── */}
        <section className="testimonials-section">
          <div className="container">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '3rem' }}>Historias de Éxito</h2>
            <div className="testimonial-grid-v2">
              <div className="testimonial-card-v2">
                <div className="testimonial-user">
                  <img src={avatarCarlos} alt="Carlos Méndez" className="user-avatar" style={{ objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 800 }}>Carlos Méndez</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Comerciante</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#444' }}>"Gracias al crédito Pyme de UNE, pudimos abrir nuestra tercera sucursal en Cartago y aumentar nuestra exportación en un 40%."</p>
              </div>
              <div className="testimonial-card-v2">
                <div className="testimonial-user">
                  <img src={avatarLucia} alt="Lucía Mora" className="user-avatar" style={{ objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 800 }}>Lucía Mora</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Restaurante</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#444' }}>"El capital de trabajo fue vital para renovar nuestra cocina."</p>
              </div>
              <div className="testimonial-card-v2">
                <div className="testimonial-user">
                  <img src={avatarEsteban} alt="Esteban Ruiz" className="user-avatar" style={{ objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 800 }}>Esteban Ruiz</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Tecnología</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#444' }}>"Gestionamos las finanzas con las herramientas de UNE de manera fácil."</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SEDES ── */}
        <div id="contacto">
            <SedeUbicacion />
        </div>

        {/* ── FINAL CTA ── */}
        <section className="final-cta">
           <div className="container" style={{ maxWidth: '800px' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>¿Listo para el siguiente nivel?</h2>
              <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '3rem' }}>
                Únete a los miles de emprendedores que ya están transformando sus negocios con UNE Costa Rica.
              </p>
              <button className="btn-primary" style={{ background: '#8B1A1A', padding: '1.25rem 3rem', fontSize: '1.1rem', borderRadius: '50px', border: 'none' }} onClick={() => navigate('/registro')}>
                Comenzar Mi Aplicación
              </button>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
