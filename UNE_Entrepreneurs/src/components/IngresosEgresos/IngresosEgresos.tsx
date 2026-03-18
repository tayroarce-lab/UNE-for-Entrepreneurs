import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, X, Info, ArrowLeft, Download, Settings } from 'lucide-react';
import './IngresosEgresos.css';
import MetricCard from './MetricCard';
import FinancialChart from './FinancialChart';
import TransactionTable from './TransactionTable';
import type { Transaction } from '../../types/business';
import { notifications } from '../../utils/notifications';

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    date: '12 Oct, 2024',
    description: 'Venta Servicio Consultoría',
    subDescription: 'Proyecto Alpha CR',
    category: 'Negocios',
    status: 'Completado',
    amount: 1250000,
  },
  {
    id: 2,
    date: '10 Oct, 2024',
    description: 'Pago Alquiler Oficinas',
    subDescription: 'San José, Escazú',
    category: 'Renta',
    status: 'Completado',
    amount: -650000,
  },
  {
    id: 3,
    date: '08 Oct, 2024',
    description: 'Suscripción SaaS UNE Tool',
    subDescription: 'Mantenimiento mensual',
    category: 'Software',
    status: 'Pendiente',
    amount: -12500,
  },
  {
    id: 4,
    date: '05 Oct, 2024',
    description: 'Inversión Capital Semilla',
    subDescription: 'Aporte Socio Estratégico',
    category: 'Inversión',
    status: 'Completado',
    amount: 2000000,
  },
];

const IngresosEgresos: React.FC = () => {
  const navigate = useNavigate();
  const [chartFilter, setChartFilter] = useState<'Ingresos' | 'Egresos' | 'Neto'>('Ingresos');
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('une_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'Ingreso' | 'Egreso'>('Ingreso');
  
  // Form State
  const [formData, setFormData] = useState({
    description: '',
    subDescription: '',
    amount: '',
    category: 'Negocios' as Transaction['category'],
  });

  useEffect(() => {
    localStorage.setItem('une_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Calculate Metrics
  const totalIncome = transactions.reduce((acc: number, t: Transaction) => t.amount > 0 ? acc + t.amount : acc, 0);
  const totalExpenses = Math.abs(transactions.reduce((acc: number, t: Transaction) => t.amount < 0 ? acc + t.amount : acc, 0));
  const netBalance = totalIncome - totalExpenses;
  const healthScore = Math.min(Math.round((netBalance / (totalIncome || 1)) * 100), 100);

  const handleOpenModal = (type: 'Ingreso' | 'Egreso') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      description: '',
      subDescription: '',
      amount: '',
      category: 'Negocios',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount) {
      notifications.error('Por favor completa los campos principales');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-CR', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: formData.description,
      subDescription: formData.subDescription || 'Transacción manual',
      category: formData.category,
      status: 'Completado',
      amount: modalType === 'Ingreso' ? Number(formData.amount) : -Number(formData.amount),
    };

    setTransactions([newTransaction, ...transactions]);
    notifications.success(`${modalType} registrado con éxito`);
    closeModal();
  };

  const handleDelete = async (id: string | number) => {
    const confirmed = await notifications.confirm(
      '¿Eliminar transacción?',
      'Esta acción no se puede deshacer',
      'warning',
      'Eliminar',
      'Cancelar'
    );

    if (confirmed) {
      setTransactions(transactions.filter((t: Transaction) => t.id !== id));
      notifications.success('Transacción eliminada');
    }
  };

  return (
    <div className="panel-container">
      {/* Header */}
      <header className="panel-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate('/')}>
            <ArrowLeft size={20} /> Volver a inicio
          </button>
          <div className="header-content">
            <h1>Control de Ingresos y Egresos</h1>
            <p>
              Gestiona tu capital con herramientas financieras de alto rendimiento.
            </p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-action btn-secondary-outline" onClick={() => notifications.info('Funcionalidad de exportación en desarrollo')}>
            <Download size={18} /> Exportar
          </button>
          <button className="btn-action btn-secondary-outline" onClick={() => notifications.info('Ajustes en desarrollo')}>
            <Settings size={18} />
          </button>
          <button className="btn-action btn-income" onClick={() => handleOpenModal('Ingreso')}>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '4px' }}>
              <Plus size={18} />
            </div>
            Registrar Ingreso
          </button>
          <button className="btn-action btn-expense" onClick={() => handleOpenModal('Egreso')}>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '4px' }}>
              <Minus size={18} />
            </div>
            Registrar Egreso
          </button>
        </div>
      </header>

      {/* Metrics Section */}
      <section className="metrics-grid">
        <MetricCard 
          label="Total Ingresos" 
          value={`₡${totalIncome.toLocaleString()}`} 
          trend="+12%" 
          trendType="up"
          footer="Acumulado histórico en plataforma"
        />
        <MetricCard 
          label="Total Egresos" 
          value={`₡${totalExpenses.toLocaleString()}`} 
          trend="-5%" 
          trendType="down"
          footer="Manteniendo eficiencia en costos"
        />
        <MetricCard 
          label="Saldo Neto Actual" 
          value={`₡${netBalance.toLocaleString()}`} 
          type="saldo"
          progress={healthScore > 0 ? healthScore : 0}
          footer=""
        />
      </section>

      {/* Chart Section */}
      <section className="chart-section">
        <div className="chart-header">
          <div className="chart-title">
            <h2>Flujo de Efectivo Mensual</h2>
            <p>Visualización comparativa de rendimiento actual</p>
          </div>
          <div className="chart-filters">
            {(['Ingresos', 'Egresos', 'Neto'] as const).map((filter) => (
              <button 
                key={filter}
                className={`filter-btn ${chartFilter === filter ? 'active' : ''}`}
                onClick={() => setChartFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="chart-content">
          <FinancialChart filter={chartFilter} />
        </div>
      </section>

      {/* Transactions Section */}
      <section className="transactions-section">
        <div className="table-header">
          <div className="table-title">
            <h2>Transacciones Recientes</h2>
          </div>
          <div className="table-controls">
            <select className="select-control">
              <option>📅 Historial Completo</option>
              <option>Últimos 30 días</option>
            </select>

            <select className="select-control">
              <option>🌪️ Todas las Categorías</option>
              <option>Negocios</option>
              <option>Renta</option>
              <option>Software</option>
              <option>Inversión</option>
            </select>

            <button 
              className="clean-filters" 
              style={{ background: 'none', border: 'none', padding: 0, textDecoration: 'underline', color: '#8b2d2d', cursor: 'pointer', fontWeight: 600 }}
              onClick={async () => {
                const confirmed = await notifications.confirm(
                  '¿Limpiar todo el historial?',
                  'Esto borrará todas las transacciones permanentemente.',
                  'warning',
                  'Limpiar Todo',
                  'Cancelar'
                );
                if (confirmed) {
                  setTransactions([]);
                  notifications.success('Historial limpiado');
                }
              }}
            >
              🗑️ Limpiar Historial
            </button>
          </div>
        </div>
        
        <TransactionTable 
          transactions={transactions} 
          onDelete={handleDelete}
        />
        
        {transactions.length > 5 && (
          <a href="#" className="view-history" onClick={(e) => e.preventDefault()}>
            Ver todo el historial
          </a>
        )}
      </section>

      {/* Modal Tooltip Info */}
      <div style={{ marginTop: '2rem', background: '#e0f2fe', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#0369a1' }}>
        <Info size={20} />
        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
          Tus datos se guardan localmente en este navegador para garantizar tu privacidad.
        </span>
      </div>

      {/* Modal Registry */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <h2>Registrar {modalType}</h2>
              <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Ingresa los detalles financieros a continuación</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Descripción Principal</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ej: Pago de cliente, Venta..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Sub descripción (Opcional)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ej: Proyecto X, Proveedor Y..."
                  value={formData.subDescription}
                  onChange={(e) => setFormData({...formData, subDescription: e.target.value})}
                />
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Monto (₡)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Categoría</label>
                  <select 
                    className="form-input"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  >
                    <option value="Negocios">Negocios</option>
                    <option value="Renta">Renta</option>
                    <option value="Software">Software</option>
                    <option value="Inversión">Inversión</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-submit">Confirmar {modalType}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button className="fab-add" onClick={() => handleOpenModal('Ingreso')}>
        <Plus size={32} />
      </button>
    </div>
  );
};

export default IngresosEgresos;
