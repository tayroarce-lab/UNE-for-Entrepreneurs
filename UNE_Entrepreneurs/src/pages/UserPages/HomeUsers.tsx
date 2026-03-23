import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Target, ClipboardList, TrendingUp,
  Check, MoveRight, ArrowRight, LayoutDashboard, Wallet, Package, Flower2
} from 'lucide-react'
import Navbar from '../../components/Shared/Navbar'
import Footer from '../../components/Shared/Footer'
import heroImage from '../../assets/hero_une.jpg'
import avatarCarlos from '../../assets/carlos_mendez.png'
import avatarLucia from '../../assets/lucia_mora.png'
import avatarEsteban from '../../assets/esteban_ruiz.png'
import avatarJaqueline from '../../assets/Jaqueline.png'
import avatarMaria from '../../assets/success_story_maria.png'
import avatarDamaris from '../../assets/Damaris.png'
import avatarGinette from '../../assets/Ginette.png'
import NewsCarousel from '../../components/UserComponents/NewsCarousel'
import InteractiveMap from '../../components/Shared/InteractiveMap'
import '../../styles/Home.css'

export default function EstructuraHome() {
  const navigate = useNavigate();

  useEffect(() => {
    // Analytics or scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page-layout">
      <Navbar />

      <main className="home-main-content">
        {/* ── NOTICIAS DESTACADAS ── */}
        <section className="featured-news" style={{ padding: 0 }}>
          <NewsCarousel />
        </section>

        {/* ── HERO SECTION: CONVERSION ORIENTED ── */}
        <section id="inicio" className="hero-section" style={{ background: 'var(--suria-cream)', padding: '10rem 0' }}>
          <div className="container">
            <div className="hero-inner" style={{ alignItems: 'center' }}>
              <div className="hero-text">
                <span className="hero-badge" style={{ background: 'var(--suria-crimson)', color: 'white', padding: '0.6rem 1.5rem', borderRadius: '50px', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '2rem', display: 'inline-block' }}>
                  CONVOCATORIA ABIERTA: PROGRAMA SÜRIA
                </span>
                <h1 style={{ fontSize: '4.8rem', color: 'var(--suria-plum)', lineHeight: 1.1, marginBottom: '2.5rem' }}>
                  El impulso que tu <span style={{ color: 'var(--suria-crimson)' }}>negocio</span> el éxito que te <span style={{ color: 'var(--suria-crimson)' }}>mereces</span>.
                </h1>
                <p style={{ fontSize: '1.4rem', color: 'var(--suria-brown)', opacity: 0.9, marginBottom: '3.5rem', lineHeight: 1.6 }}>
                  Sé parte de <strong>Süria</strong>: el programa de UNE que ha transformado la vida de 1,500 mujeres en Costa Rica.
                  Financiamiento, formación y una comunidad imparable te esperan.
                </p>
                <div className="hero-buttons" style={{ display: 'flex', gap: '20px' }}>
                  <button 
                    className="suria-btn" 
                    style={{ background: 'var(--suria-crimson)', color: 'white', padding: '1.5rem 3.5rem', fontSize: '1.1rem', borderRadius: '50px', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(169, 38, 43, 0.3)' }}
                    onClick={() => navigate('/contacto')}
                  >
                    Aplicar al Programa Ahora <MoveRight size={20} />
                  </button>
                  <button 
                    className="btn-link" 
                    style={{ background: 'none', border: 'none', color: 'var(--suria-plum)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }} 
                    onClick={() => navigate('/suria')}
                  >
                    Ver detalles de Süria
                  </button>
                </div>
              </div>

              <div className="hero-image">
                <div className="hero-image-v2" style={{ background: 'var(--suria-peach)', transform: 'rotate(2deg)', border: '12px solid white', position: 'relative' }}>
                  <img src={heroImage} alt="Emprendedora exitosa UNE" style={{ borderRadius: '24px' }} />
                  <div className="hero-stat-overlay" style={{ background: 'white', borderRadius: '24px', padding: '2rem', position: 'absolute', bottom: '30px', left: '-50px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--suria-crimson)', lineHeight: 1 }}>100%</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--suria-brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>APOYO FEMENINO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section style={{ background: 'var(--suria-plum)', padding: '4rem 0' }}>
          <div className="container">
             <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '2px' }}>CON EL RESPALDO DE:</span>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '1.2rem', opacity: 0.9 }}>Bancos Comunales</span>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '1.2rem', opacity: 0.9 }}>Red de Mujeres UNE</span>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '1.2rem', opacity: 0.9 }}>Fondo de MicroEmprendimiento</span>
             </div>
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ── */}
        <section id="noticias" className="how-works-section" style={{ background: 'white' }}>
          <div className="container">
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--suria-plum)' }}>Tu crecimiento en 3 pasos</h2>
            <p style={{ color: 'var(--suria-brown)', opacity: 0.8, fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto 5rem' }}>
                Hemos simplificado el acceso al capital y formación para que te enfoques en lo que mejor haces: crear.
            </p>
            
            <div className="how-works-grid">
              <div className="work-step card" style={{ padding: '4rem 3rem', border: '1px solid #f0f0f0' }}>
                <div className="step-icon" style={{ background: 'var(--suria-cream)', color: 'var(--suria-crimson)' }}><ClipboardList size={40} /></div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Aplica</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--suria-brown)' }}>Únete a la plataforma y completa tu perfil de emprendedora UNE para el programa Süria.</p>
              </div>
              <div className="work-step card" style={{ padding: '4rem 3rem', border: '1px solid #f0f0f0' }}>
                <div className="step-icon" style={{ background: 'var(--suria-cream)', color: 'var(--suria-crimson)' }}><Target size={40} /></div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Capacítate</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--suria-brown)' }}>Accede a talleres de gestión y finanzas antes de recibir tu primer microcrédito.</p>
              </div>
              <div className="work-step card" style={{ padding: '4rem 3rem', border: '1px solid #f0f0f0', position: 'relative' }}>
                <div className="step-icon" style={{ background: 'var(--suria-cream)', color: 'var(--suria-crimson)' }}><TrendingUp size={40} /></div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Escala</h3>
                <div style={{ position: 'relative' }}>
                  <img src={avatarMaria} alt="Paso 3" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '3px solid #fff', position: 'absolute', top: '-25px', right: '-10px', objectFit: 'cover', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }} />
                  <p style={{ fontSize: '1.1rem', color: 'var(--suria-brown)' }}>Recibe el respaldo financiero de UNE y crece junto a tu comunidad en bancos comunales.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTROL PANEL CTA: FINANCES & INVENTORY ── */}
        <section className="dashboard-cta" style={{ background: 'var(--suria-plum)', padding: '10rem 0', position: 'relative', overflow: 'hidden' }}>
           <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
                 <div className="dashboard-preview" style={{ position: 'relative' }}>
                    <div style={{ background: 'white', padding: '2.5rem', borderRadius: '30px', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                          <div style={{ padding: '1.5rem', background: 'var(--suria-cream)', borderRadius: '20px', color: 'var(--suria-crimson)' }}><Wallet size={24} /></div>
                          <div style={{ padding: '1.5rem', background: 'var(--suria-cream)', borderRadius: '20px', color: 'var(--suria-crimson)' }}><Package size={24} /></div>
                          <div style={{ padding: '1.5rem', background: 'var(--suria-cream)', borderRadius: '20px', color: 'var(--suria-crimson)' }}><LayoutDashboard size={24} /></div>
                       </div>
                       <div style={{ background: '#f8f8f8', height: '15px', width: '100%', borderRadius: '10px', marginBottom: '1.5rem' }}></div>
                       <div style={{ background: '#f8f8f8', height: '15px', width: '80%', borderRadius: '10px', marginBottom: '1.5rem' }}></div>
                       <div style={{ background: '#f8f8f8', height: '15px', width: '90%', borderRadius: '10px' }}></div>
                       <div style={{ marginTop: '3rem', fontSize: '2.5rem', fontWeight: 900, color: 'var(--suria-plum)' }}>+₡450,000</div>
                       <div style={{ fontSize: '0.8rem', color: 'var(--suria-brown)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>VENTAS DEL MES</div>
                    </div>
                    {/* Floating decoration */}
                    <div style={{ position: 'absolute', top: '-40px', right: '-40px', background: 'var(--suria-gold)', color: 'var(--suria-plum)', padding: '1.5rem 2.5rem', borderRadius: '20px', fontWeight: 900, boxShadow: '0 15px 30px rgba(212, 168, 83, 0.4)' }}>
                        Gestión Inteligente
                    </div>
                 </div>
                 <div className="dashboard-text">
                    <span style={{ color: 'var(--suria-gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase' }}>TU NEGOCIO EN TUS MANOS</span>
                    <h2 style={{ fontSize: '4.2rem', color: 'white', marginTop: '2.5rem', marginBottom: '3rem', lineHeight: 1.1 }}>Toma el control total de tus <span style={{ color: 'var(--suria-gold)' }}>finanzas e inventario.</span></h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.35rem', lineHeight: 1.7, marginBottom: '5rem' }}>
                       Accede a herramientas exclusivas de gestión financiera diseñadas para emprendedoras.
                       Registra tus ventas, controla tu stock en tiempo real y visualiza tu progreso mes a mes.
                    </p>
                    <button 
                      className="suria-btn" 
                      style={{ background: 'var(--suria-gold)', color: 'var(--suria-plum)', padding: '1.6rem 4rem', fontSize: '1.15rem' }}
                      onClick={() => navigate('/presupuesto')}
                    >
                      Entrar a mi Panel de Control <MoveRight size={22} style={{ marginLeft: '12px' }} />
                    </button>
                 </div>
              </div>
           </div>
           {/* Decorative elements */}
           <div style={{ position: 'absolute', top: '-10%', right: '-5%', color: 'white', opacity: 0.03 }}>
              <Flower2 size={500} strokeWidth={0.5} />
           </div>
        </section>

        {/* ── SÜRIA FEATURE SHOWCASE ── */}
        <section className="suria-feature" style={{ padding: '10rem 0', background: 'var(--suria-ivory)' }}>
           <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
                 <div style={{ background: 'white', padding: '1rem', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.05)' }}>
                    <div style={{ background: 'var(--suria-plum)', borderRadius: '30px', padding: '4rem', color: 'white' }}>
                       <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--suria-gold)' }}>¿Por qué Süria?</h3>
                       <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                         <li style={{ display: 'flex', gap: '15px' }}><Check color="var(--suria-gold)" /> <div><strong>Cero trámites imposibles:</strong> Diseñado para la realidad de la mujer costarricense.</div></li>
                         <li style={{ display: 'flex', gap: '15px' }}><Check color="var(--suria-gold)" /> <div><strong>Garantía Solidaria:</strong> Tu comunidad es tu respaldo, no necesitas propiedades.</div></li>
                         <li style={{ display: 'flex', gap: '15px' }}><Check color="var(--suria-gold)" /> <div><strong>Crecimiento Real:</strong> El 92% de nuestras emprendedoras han mejorado sus ingresos.</div></li>
                       </ul>
                    </div>
                 </div>
                 <div>
                    <span style={{ color: 'var(--suria-crimson)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>APOYO REAL</span>
                    <h2 style={{ fontSize: '3.5rem', marginTop: '1.5rem', marginBottom: '2.5rem' }}>No es solo un crédito, es una nueva <span style={{ color: 'var(--suria-crimson)' }}>oportunidad</span> de vida.</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--suria-brown)', lineHeight: 1.7, marginBottom: '3.5rem' }}>
                       En UNE comprendemos que el talento está en todas partes, pero las oportunidades no. 
                       Por eso creamos Süria, para ser el motor que encienda tu negocio.
                    </p>
                    <button 
                      className="suria-btn" 
                      style={{ background: 'var(--suria-plum)', color: 'white', padding: '1.25rem 3rem' }}
                      onClick={() => navigate('/contacto')}
                    >
                      Quiero unirme al grupo de mi comunidad
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="testimonials-section" style={{ padding: '8rem 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--suria-plum)' }}>Voces de éxito</h2>
                <p style={{ color: 'var(--suria-brown)', opacity: 0.7, fontSize: '1.2rem', margin: 0 }}>Historias de mujeres que creyeron en sí mismas y en UNE.</p>
              </div>
              <button 
                onClick={() => navigate('/nuestra-gente')}
                style={{ 
                  border: 'none', 
                  background: 'none', 
                  color: 'var(--suria-crimson)', 
                  fontWeight: 700, 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  fontSize: '1rem',
                  padding: '10px 0'
                }}
              >
                Ver todas las historias <ArrowRight size={18} />
              </button>
            </div>
            <div className="testimonial-grid-v2">
              {[
                { name: 'Marielos', trade: 'Emprendedora Gastronómica', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400', text: 'Gracias al programa de UNE, las mujeres de mi comunidad ahora tenemos voz y negocio propio.' },
                { name: 'Katherine', trade: 'Panadería Artesanal', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400', text: 'El acompañamiento de Süria me dio la confianza para administrar mis ventas profesionalmente.' },
                { name: 'Ginette', trade: 'Artesanías locales', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400', text: 'UNE confió en mi talento cuando nadie más lo hizo. Hoy mi taller es una realidad.' }
              ].map((t, i) => (
                <div key={i} className="testimonial-card-v2 card" style={{ padding: '3.5rem 2.5rem', textAlign: 'center', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                  <div style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', border: '5px solid white', margin: '0 auto 2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                     <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontWeight: 900, fontSize: '1.6rem', color: 'var(--suria-plum)', marginBottom: '0.4rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--suria-crimson)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'var(--font-ui)' }}>{t.trade}</div>
                  </div>
                  <div style={{ position: 'relative', padding: '0 1rem' }}>
                    <p className="accent-phrase" style={{ fontSize: '1.25rem', color: 'var(--suria-brown)', lineHeight: 1.6, fontStyle: 'italic', opacity: 0.9 }}>"{t.text}"</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '2.5rem', color: '#4A1525' }}>Cientos de emprendedores ya son parte</h3>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                {[avatarCarlos, avatarLucia, avatarEsteban, avatarJaqueline, avatarMaria, avatarDamaris, avatarGinette].map((img, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img 
                      src={img} 
                      alt={`Emprendedor ${i}`} 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '24px', 
                        objectFit: 'cover', 
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                        transform: `rotate(${i % 2 === 0 ? '3deg' : '-3deg'})`,
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1) rotate(0deg)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? '3deg' : '-3deg'})`)}
                    />
                  </div>
                ))}
              </div>
              <p style={{ marginTop: '2rem', color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>
                Únase a una comunidad vibrante que crece cada día.
              </p>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="final-cta" style={{ background: 'var(--suria-plum)', margin: '4rem 0', padding: '10rem 4rem', borderRadius: '40px' }}>
           <div className="container" style={{ maxWidth: '900px' }}>
              <span style={{ color: 'var(--suria-gold)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase' }}>TÚ ERES LA SIGUIENTE</span>
              <h2 style={{ fontSize: '4.5rem', color: 'white', marginTop: '2rem', marginBottom: '3rem' }}>¿Lista para transformar tu realidad?</h2>
              <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.8)', marginBottom: '5rem', lineHeight: 1.6 }}>
                El Programa Süria está buscando emprendedoras como tú. Déjanos tus datos y nos pondremos 
                en contacto para explicarte cómo sumarte a un Banco Comunal de UNE.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button 
                  className="suria-btn" 
                  style={{ background: 'var(--suria-gold)', color: 'var(--suria-plum)', padding: '1.5rem 4rem', fontSize: '1.2rem', fontWeight: 900 }} 
                  onClick={() => navigate('/contacto')}
                >
                  Solicitar Información para Aplicar
                </button>
              </div>
           </div>
        </section>

        {/* ── UBICACIÓN Y HORARIOS ── */}
        <section style={{ background: 'var(--suria-ivory)', padding: '8rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span style={{ color: 'var(--suria-crimson)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>ENCUÉNTRANOS</span>
              <h2 style={{ fontSize: '3.5rem', color: 'var(--suria-plum)', marginTop: '1rem', marginBottom: '1rem' }}>Nuestra Sede & Horarios</h2>
              <p style={{ color: 'var(--suria-brown)', opacity: 0.7, fontSize: '1.1rem' }}>Estamos aquí para acompañarte en cada paso del camino.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }}>
              
              {/* Horarios */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                <div className="card" style={{ padding: '3rem', borderRadius: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <div style={{ background: 'var(--suria-crimson)', color: 'white', width: '52px', height: '52px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--suria-plum)', fontWeight: 800, margin: 0 }}>Horario de Atención</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[
                      { dias: 'Lunes – Viernes', horas: '8:00 AM – 5:00 PM', badge: 'Abierto' },
                      { dias: 'Sábados', horas: '8:00 AM – 12:00 PM', badge: 'Medio día' },
                      { dias: 'Domingos', horas: 'Cerrado', badge: null },
                    ].map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', background: i === 2 ? '#fef2f2' : 'var(--suria-ivory)', borderRadius: '14px', border: `1px solid ${i === 2 ? '#fecaca' : 'transparent'}` }}>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--suria-plum)', fontSize: '0.95rem' }}>{h.dias}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--suria-brown)', opacity: 0.8, marginTop: '2px' }}>{h.horas}</div>
                        </div>
                        {h.badge && (
                          <span style={{ background: i === 1 ? 'rgba(212,168,83,0.15)' : 'rgba(169,38,43,0.1)', color: i === 1 ? 'var(--suria-brown)' : 'var(--suria-crimson)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800 }}>
                            {h.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card" style={{ padding: '2.5rem 3rem', borderRadius: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--suria-plum)', fontWeight: 800, marginBottom: '1.5rem' }}>📍 Sede UNE Santa Ana</h3>
                  <p style={{ color: 'var(--suria-brown)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1rem' }}>
                    Diagonal a la iglesia católica,<br />San José, Santa Ana, Costa Rica.
                  </p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=9.9326,-84.1824"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '1rem', background: 'var(--suria-plum)', color: 'white', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.3s' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                    ¿Cómo llegar con Google Maps?
                  </a>
                </div>
              </div>

              {/* Mapa */}
              <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.1)', border: '4px solid white', height: '520px' }}>
                <InteractiveMap height="520px" />
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .home-map-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>

      </main>

      <Footer />

      <style>{`
        /* RESPONSIVE OVERRIDES FOR HOME PAGE */
        @media (max-width: 1024px) {
          .suria-hero-inner, 
          .dashboard-cta .container > div,
          .suria-feature .container > div {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 4rem !important;
          }

          .suria-hero-title,
          .dashboard-cta h2,
          .final-cta h2 {
            font-size: 3.2rem !important;
          }

          .suria-feature h2 {
            font-size: 2.8rem !important;
          }

          .suria-hero-image-container {
             max-width: 450px;
             margin: 0 auto;
          }

          .dashboard-preview {
             max-width: 500px;
             margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .suria-hero-title,
          .dashboard-cta h2,
          .final-cta h2 {
            font-size: 2.5rem !important;
          }

          .suria-hero-description,
          .dashboard-cta p,
          .final-cta p {
            font-size: 1.1rem !important;
          }

          .final-cta {
             padding: 6rem 2rem !important;
             border-radius: 0 !important;
             margin: 2rem 0 !important;
          }

          .suria-feature h2 {
             font-size: 2.2rem !important;
          }
        }

        @media (max-width: 576px) {
           .suria-hero-title {
              font-size: 2rem !important;
           }
           
           .suria-btn {
              width: 100% !important;
              padding: 1.25rem 2rem !important;
              font-size: 1rem !important;
           }

           .suria-feature ul li {
              text-align: left;
           }

           .suria-feature .suria-btn {
              width: 100% !important;
           }
        }
      `}</style>
    </div>
  )
}
