import React from 'react';
import { CheckCircle2, Clock, Briefcase, Home, Smartphone, BarChart3, Trash2 } from 'lucide-react';

export interface Transaction {
  id: string | number;
  date: string;
  description: string;
  subDescription: string;
  category: 'Negocios' | 'Renta' | 'Software' | 'Inversión';
  status: 'Completado' | 'Pendiente';
  amount: number;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete?: (id: string | number) => void;
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Negocios': return <Briefcase size={14} />;
    case 'Renta': return <Home size={14} />;
    case 'Software': return <Smartphone size={14} />;
    case 'Inversión': return <BarChart3 size={14} />;
    default: return null;
  }
};

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <Briefcase size={48} />
        </div>
        <p>No hay transacciones registradas aún.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Monto</th>
            {onDelete && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td className="transaction-desc">
                <span className="desc-main">{t.description}</span>
                <span className="desc-sub">{t.subDescription}</span>
              </td>
              <td>
                <span className={`category-tag cat-${t.category.toLowerCase().replace('ó', 'o')}`}>
                  <CategoryIcon category={t.category} />
                  {t.category}
                </span>
              </td>
              <td>
                <span className={`status-badge status-${t.status === 'Completado' ? 'completed' : 'pending'}`}>
                  {t.status === 'Completado' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                  {t.status}
                </span>
              </td>
              <td className={`amount ${t.amount > 0 ? 'amount-positive' : 'amount-negative'}`}>
                {t.amount > 0 ? '+' : ''}₡{Math.abs(t.amount).toLocaleString()}
              </td>
              {onDelete && (
                <td>
                  <button 
                    onClick={() => onDelete(t.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
