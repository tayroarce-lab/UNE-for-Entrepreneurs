import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Package, LayoutDashboard, MoveRight } from 'lucide-react';
import styles from './DashboardCTA.module.css';

interface DashboardCTAProps {
  badge?: string;
  title?: React.ReactNode;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  previewLabel?: string;
  previewAmount?: string;
}

const DashboardCTA: React.FC<DashboardCTAProps> = ({
  badge = "HERRAMIENTAS PARA TU NEGOCIO",
  title = (
    <>
      Todo el control de tu <br /> <span className={styles.ctaTitleAccent}>empresa</span> desde tu celular.
    </>
  ),
  description = "No solo te damos el capital. Te damos las herramientas para que gestiones tus inventarios, presupuestos y ventas con la tecnología de UNE.",
  buttonText = "CONOCER LAS HERRAMIENTAS",
  buttonLink = "/panel",
  previewLabel = "BALANCE TOTAL",
  previewAmount = "₡1,250,000"
}) => {
  const navigate = useNavigate();

  return (
    <section className={styles.dashboardCta}>
      <div className="container">
        <div className={styles.ctaInner}>
          <div className={styles.previewWrapper}>
            <div className={styles.previewCard}>
              <div className={styles.iconRow}>
                <div className={styles.iconBox}><Wallet size={24} /></div>
                <div className={styles.iconBox}><Package size={24} /></div>
                <div className={styles.iconBox}><LayoutDashboard size={24} /></div>
              </div>
              <div className={`${styles.placeholderBar} ${styles.placeholderBarMid}`}></div>
              <div className={`${styles.placeholderBar} ${styles.placeholderBarShort}`}></div>
              <div className={styles.statValue}>{previewAmount}</div>
              <div className={styles.statLabel}>{previewLabel}</div>
            </div>
            <div className={styles.floatingTag}>Ventas +24%</div>
            <div className={styles.bgDecoration}>
              <LayoutDashboard size={800} />
            </div>
          </div>
          
          <div className={styles.ctaText}>
            <span className={styles.ctaBadge}>{badge}</span>
            <h2 className={styles.ctaTitle}>{title}</h2>
            <p className={styles.ctaDesc}>{description}</p>
            <button 
              className={styles.ctaButton}
              onClick={() => navigate(buttonLink)}
            >
              {buttonText} <MoveRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardCTA;
