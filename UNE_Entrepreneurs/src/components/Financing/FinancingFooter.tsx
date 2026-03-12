// ============================================================
// Footer — UNE Entrepreneurs
// ============================================================
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';
import '../../styles/financing.css';

export default function FinancingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="financingFooter" aria-label="Pie de página">
      <div className="financingContainer">
        <div className="financingFooterGrid">
          <div className="financingFooterCol">
            <h3 className="financingFooterBrand">UNE Costa Rica</h3>
            <p className="financingFooterDesc">
              Uniendo esfuerzos para el desarrollo integral de emprendedores e innovadores en Costa Rica.
              Apoyo en gestión empresarial, formalización y acceso a crédito.
            </p>
            <div className="financingFooterSocial">
              <a href="https://facebook.com/unecostarica" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://linkedin.com/company/unecostarica" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com/unecostarica" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="financingFooterCol">
            <h4>Enlaces Rápidos</h4>
            <ul className="financingFooterLinks">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/financiamiento">Créditos para PyMEs</Link></li>
              <li><Link to="/registro">Formulación de Proyectos</Link></li>
              <li><Link to="/contacto">Asesoría Empresarial</Link></li>
            </ul>
          </div>

          <div className="financingFooterCol">
            <h4>Contacto UNE</h4>
            <ul className="financingFooterLinks">
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Mail size={16} /> <a href="mailto:info@une.cr">info@une.cr</a>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={16} /> <a href="tel:+50622222222">+506 2222-2222</a>
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ marginTop: '4px' }} />
                <span>
                  Edificio Cenfotec, San Pedro,<br />
                  Montes de Oca, San José, CR
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="financingFooterBottom">
          <p>
            &copy; {currentYear} Unión Nacional de Emprendedores (UNE). Todos los derechos reservados.
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.8 }}>
            FinanciaPyme CR es una plataforma informativa. Las condiciones finales de crédito
            están sujetas a la aprobación de la entidad financiera respectiva.
          </p>
        </div>
      </div>
    </footer>
  );
}
