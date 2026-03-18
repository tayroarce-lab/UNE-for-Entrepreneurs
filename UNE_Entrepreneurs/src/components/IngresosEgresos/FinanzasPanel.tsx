import { useState, useMemo, useEffect, useRef } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from '../../services/BusinessService';
import { useAuth } from '../../context/AuthContext';
import type { Transaction } from '../../types/business';
import Swal from 'sweetalert2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function FinanzasPanel() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [type, setType] = useState<'income' | 'expense' | 'investment'>('income');
  const [category, setCategory] = useState('Venta de Productos');
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Load from API
  const fetchTransactions = async () => {
    if (user) {
      try {
        const data = await getTransactions(user.id);
        setTransactions(data);
      } catch (error) {
        console.error('Error al cargar transacciones:', error);
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const investment = transactions.filter(t => t.type === 'investment').reduce((acc, t) => acc + t.amount, 0);
    const totalOut = expense + investment;
    const net = income - totalOut;
    const margin = income > 0 ? (net / income) * 100 : 0;
    
    return { income, expense, investment, totalOut, net, margin };
  }, [transactions]);

  const handleAddTransaction = async () => {
    if (!description || !amount || Number(amount) <= 0) return;

    try {
      if (editingId) {
        const updated = {
          description,
          amount: Number(amount),
          type,
          category,
        };
        await updateTransaction(editingId, updated);
        setTransactions(transactions.map(t => t.id === editingId ? { ...t, ...updated } : t));
        
        setEditingId(null);
        Swal.fire({
          title: 'Actualizado',
          text: 'Transacción actualizada correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        const newTx: Omit<Transaction, 'id'> = {
          userId: user?.id,
          description,
          amount: Number(amount),
          type,
          category,
          date: new Date().toISOString()
        };
        const result = await createTransaction(newTx);
        setTransactions([result, ...transactions]);
      }

      setDescription('');
      setAmount('');
      setType('income');
      setCategory('Venta de Productos');
    } catch (error) {
      console.error('Error saving transaction:', error);
      Swal.fire('Error', 'No se pudo guardar la transacción', 'error');
    }
  };

  const startEdit = (t: Transaction) => {
    setEditingId(t.id);
    setDescription(t.description);
    setAmount(t.amount);
    setType(t.type || 'income');
    setCategory(t.category);

    // Redirect to form area orderly
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Focus the first input after a short delay
    const firstInput = formRef.current?.querySelector('input');
    if (firstInput instanceof HTMLInputElement) {
      setTimeout(() => firstInput.focus(), 600);
    }
  };

  const removeTransaction = (id: string | number) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¿Realmente desea eliminar este registro? Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8B1A1A',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTransaction(id);
          setTransactions(transactions.filter(t => t.id !== id));
          Swal.fire({
            title: 'Eliminado',
            text: 'El registro ha sido eliminado correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } catch (error) {
          console.error('Error deleting transaction:', error);
          Swal.fire('Error', 'No se pudo eliminar la transacción', 'error');
        }
      }
    });
  };

  const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ingresos',
        data: [12000, 19000, 15000, 25000, 18000, stats.income],
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderRadius: 8,
      },
      {
        label: 'Egresos e Inversión',
        data: [8000, 12000, 11000, 18000, 14000, stats.totalOut],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderRadius: 8,
      }
    ]
  };

  const pieData = {
    labels: ['Operativos', 'Personal', 'Marketing', 'Inversión'],
    datasets: [{
      data: [
        transactions.filter(t => t.category === 'Costos Operativos').length || 1,
        transactions.filter(t => t.category === 'Pago de Personal').length || 1,
        transactions.filter(t => t.category === 'Publicidad').length || 1,
        stats.investment || 1
      ],
      backgroundColor: ['#7B2D3B', '#E8533F', '#F5EDE0', '#D4A853'],
      borderWidth: 0
    }]
  };

  return (
    <div className="finanzas-panel">
      {/* Header Stat Cards */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="stat-card premium-card">
          <div className="icon-wrap income"><DollarSign size={20} /></div>
          <div className="stat-content">
            <span className="label">Ingresos Totales</span>
            <span className="value">₡{stats.income.toLocaleString()}</span>
          </div>
        </div>
        <div className="stat-card premium-card">
          <div className="icon-wrap expense"><TrendingDown size={20} /></div>
          <div className="stat-content">
            <span className="label">Egresos & Costos</span>
            <span className="value">₡{stats.totalOut.toLocaleString()}</span>
          </div>
        </div>
        <div className="stat-card premium-card">
          <div className="icon-wrap profit"><TrendingUp size={20} /></div>
          <div className="stat-content">
            <span className="label">Ganancia Neta</span>
            <span className="value" style={{ color: stats.net >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
              ₡{stats.net.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="stat-card premium-card">
          <div className="icon-wrap margin"><PieChart size={20} /></div>
          <div className="stat-content">
            <span className="label">Margen Utilidad</span>
            <span className="value">{stats.margin.toFixed(1)}%</span>
            <div className="progress-mini"><div className="bar" style={{ width: `${Math.min(100, Math.max(0, stats.margin))}%` }}></div></div>
          </div>
        </div>
      </div>

      <div className="main-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Registro y Lista */}
        <section className={`premium-card section-card ${editingId ? 'edit-highlight' : ''}`} ref={formRef}>
          <div className="section-header">
            <h3>{editingId ? 'Editar Transacción' : 'Nueva Transacción'}</h3>
          </div>
          <div className="transaction-form" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <input 
                type="text" 
                placeholder="Descripción (ej. Venta pedido #50)" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="premium-input"
              />
            </div>
            <div className="form-group" style={{ width: '120px' }}>
              <input 
                type="number" 
                placeholder="₡ Monto" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="premium-input"
              />
            </div>
            <div className="form-group">
              <select value={type} onChange={(e) => setType(e.target.value as any)} className="premium-select">
                <option value="income">Ingreso (+)</option>
                <option value="expense">Egreso (-)</option>
                <option value="investment">Inversión (🚀)</option>
              </select>
            </div>
            <div className="form-group">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="premium-select">
                <option value="Venta de Productos">Ganancias Ventas</option>
                <option value="Costos Operativos">Costos Operativos</option>
                <option value="Pago de Personal">Pagos Personal</option>
                <option value="Publicidad">Marketing/Publi</option>
                <option value="Maquinaria">Equipos/Inversión</option>
              </select>
            </div>
            <button className="btn-add-tx" onClick={handleAddTransaction}>
              <Plus size={20} /> {editingId ? 'Guardar Cambios' : 'Registrar'}
            </button>
            {editingId && (
              <button 
                onClick={() => {
                  setEditingId(null);
                  setDescription('');
                  setAmount('');
                  setType('income');
                  setCategory('Venta de Productos');
                }}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Cancelar
              </button>
            )}
          </div>

          <div className="tx-list-container">
            <h3>Historial Reciente</h3>
            <div className="tx-list">
              {transactions.length === 0 ? (
                <div className="empty-state">No hay registros aún</div>
              ) : (
                transactions.map(t => (
                  <div key={t.id} className="tx-item">
                    <div className={`tx-icon ${t.type}`}>
                      {t.type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    </div>
                    <div className="tx-info">
                      <span className="desc">{t.description}</span>
                      <span className="meta">{t.category} • {new Date(t.date).toLocaleDateString()}</span>
                    </div>
                    <div className={`tx-amount ${t.type}`}>
                      {t.type === 'income' ? '+' : '-'} ₡{t.amount.toLocaleString()}
                    </div>
                    <div className="actions-cell" style={{ display: 'flex', gap: '4px' }}>
                      <button className="btn-edit" onClick={() => startEdit(t)} style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-del" onClick={() => removeTransaction(t.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Gráficos */}
        <div className="charts-col">
          <section className="premium-card section-card chart-card">
            <h3>Flujo Mensual</h3>
            <div className="chart-container">
              <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          </section>
          
          <section className="premium-card section-card chart-card" style={{ marginTop: '1.5rem' }}>
            <h3>Distribución de Gastos</h3>
            <div className="chart-container-pie" style={{ padding: '1rem' }}>
              <Pie data={pieData} options={{ plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </section>
        </div>
      </div>

      <style>{`
        .finanzas-panel {
          padding: 1rem 0;
        }
        .premium-card {
          background: #fff;
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }
        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-wrap.income { background: #dcfce7; color: #166534; }
        .icon-wrap.expense { background: #fee2e2; color: #991b1b; }
        .icon-wrap.profit { background: #fef9c3; color: #854d0e; }
        .icon-wrap.margin { background: #fdf2f2; color: var(--color-primary); }
        
        .stat-content { display: flex; flex-direction: column; }
        .stat-content .label { font-size: 0.75rem; color: #666; font-weight: 500; }
        .stat-content .value { font-size: 1.25rem; font-weight: 800; color: #1a1a1a; }
        
        .progress-mini {
          width: 100%;
          height: 4px;
          background: #f1f1f1;
          border-radius: 2px;
          margin-top: 4px;
          overflow: hidden;
        }
        .progress-mini .bar {
          height: 100%;
          background: var(--color-primary);
        }

        .premium-input, .premium-select {
          width: 100%;
          padding: 0.65rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-family: inherit;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .premium-input:focus { border-color: var(--color-primary); }
        
        .btn-add-tx {
          background: var(--color-primary);
          color: #fff;
          border: none;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-add-tx:hover { background: var(--color-primary-dark); transform: scale(1.02); }

        .tx-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .tx-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid transparent;
        }
        .tx-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tx-icon.income { background: #dcfce7; color: #166534; }
        .tx-icon.expense { background: #fee2e2; color: #991b1b; }
        .tx-icon.investment { background: #eff6ff; color: #1e40af; }
        
        .tx-info { flex: 1; display: flex; flex-direction: column; }
        .tx-info .desc { font-weight: 600; font-size: 0.9rem; color: #334155; }
        .tx-info .meta { font-size: 0.7rem; color: #64748b; }
        
        .tx-amount { font-weight: 700; font-size: 0.95rem; }
        .tx-amount.income { color: #166534; }
        .tx-amount.expense { color: #991b1b; }
        
        .btn-del {
          color: #94a3b8;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .btn-del:hover { color: #ef4444; }
        
        .empty-state {
          text-align: center;
          padding: 2rem;
          color: #94a3b8;
          font-style: italic;
        }

        .edit-highlight {
          border: 2px solid var(--color-primary) !important;
          animation: pulse-border 2s infinite;
        }

        @keyframes pulse-border {
          0% { box-shadow: 0 0 0 0 rgba(123, 45, 59, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(123, 45, 59, 0); }
          100% { box-shadow: 0 0 0 0 rgba(123, 45, 59, 0); }
        }
      `}</style>
    </div>
  );
}
