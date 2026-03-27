import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerUsers}>
      <div className={styles.footerContainer}>
        {/* INFO Section */}
        <div className={styles.footerInfo}>
          <h3 className={styles.footerLogo}>UNE</h3>
          <p>Uniendo personas, fortaleciendo emprendimientos y construyendo una comunidad próspera y humana en Costa Rica.</p>
          <div className={styles.footerSocial}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS Section */}
        <div className={styles.footerLinks}>
          <h4>Explorar</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/suria">Programa Süria</Link></li>
            <li><Link to="/noticias">Noticias</Link></li>
            <li><Link to="/nuestra-gente">Nuestra Gente</Link></li>
          </ul>
        </div>

        {/* SUPPORT Section */}
        <div className={styles.footerLinks}>
          <h4>Asistencia</h4>
          <ul>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link></li>
            <li><Link to="/terminos">Términos y Condiciones</Link></li>
          </ul>
        </div>

        {/* CONTACT Section */}
        <div className={styles.footerContact}>
          <h4>Ubicación</h4>
          <p><MapPin size={18} /> Paseo Colón, San José, CR</p>
          <p><Phone size={18} /> +506 2200-0000</p>
          <p><Mail size={18} /> contacto@une.cr</p>
        </div>
      </div>

      <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Unión de Nacional de Emprendedores (UNE). Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
