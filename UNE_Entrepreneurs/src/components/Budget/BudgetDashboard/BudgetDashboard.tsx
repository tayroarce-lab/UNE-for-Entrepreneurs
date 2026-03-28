import React from 'react';
import { Info, Package } from 'lucide-react';
import FinanzasPanel from '../../IngresosEgresos/FinanzasPanel';
import styles from './BudgetDashboard.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const BudgetDashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  return (
    <main className={styles.budgetDashboard}>
      <header className={styles.budgetHeader}>
        <div className={styles.titleArea}>
          <h1>
            Panel de Control <span className={styles.titleAccent}>UNE</span>
          </h1>
          <p className={styles.titleDesc}>
            Gestione su presupuesto y finanzas en un solo lugar.
          </p>
        </div>
        {/* Quick access to Inventory Management */}
        <Link
          to={isAdmin ? '/admin/presupuesto' : '#'}
          className={styles.inventoryBtn}
          title="Ir a Gestión de Inventarios"
        >
          <Package size={20} />
          <span>Gestión de Inventarios</span>
        </Link>
      </header>

      <div className={styles.panelContentArea}>
        <FinanzasPanel />
      </div>

      <footer className={styles.panelTip}>
        <div className={styles.panelTipIcon}>
          <Info size={24} />
        </div>
        <div>
          <h4>Consejo UNE:</h4>
          <p>
            Realizar un seguimiento constante de sus ingresos y egresos le permite proyectar sus necesidades de inversión
            de forma más precisa. Recuerde registrar cada movimiento para ver reflejado su margen
            de utilidad real en tiempo real.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default BudgetDashboard;
