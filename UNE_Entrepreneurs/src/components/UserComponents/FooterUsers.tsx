import { useNavigate, useLocation } from 'react-router-dom'
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react'

/**
 * FooterUsers: Pie de página completo con múltiples columnas.
 * Los enlaces de Acceso Rápido usan navegación SPA con react-router.
 */
export default function FooterUsers() {
  const navigate = useNavigate();
  const location = useLocation();

  /** Navegar a una ruta SPA sin recargar la página */
  const goTo = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /** Scroll suave a una sección. Si no estamos en Home, navega primero */
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
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram"><Instagram size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Acceso Rápido</h4>
          <ul>
            <li><a href="/" onClick={(e) => goTo(e, '/')}>Inicio</a></li>
            <li><a href="/login" onClick={(e) => goTo(e, '/login')}>Iniciar Sesión</a></li>
            <li><a href="/registro" onClick={(e) => goTo(e, '/registro')}>Registrarse</a></li>
            <li><a href="/#catalogo" onClick={(e) => scrollToSection(e, 'catalogo')}>Recursos</a></li>
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
          <p><Mail size={18} /> info@UNE-Entrepreneurs.com</p>
          <p><Phone size={18} /> +506 2222-3333</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} UNE Entrepreneurs. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
