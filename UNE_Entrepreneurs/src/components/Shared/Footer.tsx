import { useNavigate, useLocation } from 'react-router-dom'
import { MapPin, Mail, Phone, Facebook, Linkedin, Instagram } from 'lucide-react'

const TiktokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    width={size} 
    height={size} 
    fill="currentColor"
    style={{ marginTop: '2px' }} // Optional slight alignment tweak if needed compared to lucide
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.41-2.92 5.72-1.8 1.34-4.23 1.76-6.38 1.11-2.15-.62-3.87-2.19-4.73-4.25-.86-2.06-.71-4.49.33-6.43 1.05-1.93 2.94-3.32 5.09-3.72 1.94-.36 3.99-.07 5.71.9 0-1.49-.01-2.97.02-4.46-1.11-.27-2.26-.35-3.4-.23-2.07.19-4.04 1.13-5.46 2.62-1.41 1.48-2.22 3.53-2.24 5.61-.03 2.07.72 4.13 2.1 5.64 1.38 1.5 3.39 2.45 5.46 2.62 2.08.18 4.21-.35 5.92-1.57 1.71-1.21 2.82-3.09 3.12-5.18.3-2.09.02-4.26-1-6.14-.02-1.86-.01-3.73-.01-5.59z"/>
  </svg>
);

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer-users">
      <div className="footer-container">
        <div className="footer-info">
          <h3>UNE Entrepreneurs</h3>
          <p>
            Ofrecemos soluciones diseñadas para impulsar el talento emprendedor 
            universitario con herramientas y una comunidad de apoyo.
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com/UNECostaRica/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={20} />
            </a>
            <a href="https://cr.linkedin.com/company/une-costa-rica" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
            </a>
            <a href="https://www.instagram.com/unecostarica" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@unecostarica" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ display: 'flex', alignItems: 'center' }}>
                <TiktokIcon size={18} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Acceso Rápido</h4>
          <ul>
            <li><a href="/" onClick={(e) => goTo(e, '/')}>Inicio</a></li>
            <li><a href="/login" onClick={(e) => goTo(e, '/login')}>Iniciar Sesión</a></li>
            <li><a href="/registro" onClick={(e) => goTo(e, '/registro')}>Registrarse</a></li>
            <li><a href="/financiamiento" onClick={(e) => goTo(e, '/financiamiento')}>Catálogo</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Empresas</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Gobierno Corporativo</a></li>
            <li><a href="/#noticias" onClick={(e) => scrollToSection(e, 'noticias')}>Blog del Emprendedor</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Términos y condiciones</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Privacidad</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contacto</h4>
          <p><MapPin size={18} /> Sede Central, Campus UNE</p>
          <p><Mail size={18} /> info@une.cr</p>
          <p><Phone size={18} /> +506 2222-2222</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} UNE Entrepreneurs. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
