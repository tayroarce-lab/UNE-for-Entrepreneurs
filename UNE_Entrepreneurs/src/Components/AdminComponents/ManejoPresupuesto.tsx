import React, { useState } from 'react'
import '../../Styles/ManejoPresupuesto.css'
import { Wallet, ArrowLeft, TrendingUp, TrendingDown, DollarSign, History } from 'lucide-react'


interface Transaccion {
    id: number;
    concepto: string;
    monto: number;
    tipo: 'INGRESO' | 'EGRESO';
    fecha: string;
}

function ManejoPresupuesto() {
  const [transacciones] = useState<Transaccion[]>([
      { id: 1, concepto: 'Venta Curso UX para Emprendedores', monto: 1500, tipo: 'INGRESO', fecha: '2026-03-10' },
      { id: 2, concepto: 'Pago Servidores AWS', monto: 300, tipo: 'EGRESO', fecha: '2026-03-11' },
      { id: 3, concepto: 'Mantenimiento Local Físico', monto: 200, tipo: 'EGRESO', fecha: '2026-03-12' }
  ]);

  const balanceTotal = transacciones.reduce((acc: number, curr: Transaccion) => {
      return curr.tipo === 'INGRESO' ? acc + curr.monto : acc - curr.monto;
  }, 0);

  const ingresosSuma = transacciones.filter((t: Transaccion) => t.tipo === 'INGRESO').reduce((a: number, b: Transaccion) => a + b.monto, 0);
  const egresosSuma = transacciones.filter((t: Transaccion) => t.tipo === 'EGRESO').reduce((a: number, b: Transaccion) => a + b.monto, 0);

  return (
    <div className="admin-container admin-container-no-nav">
      <div className="admin-main-wrap">
        <header>
            <h1><Wallet size={24} /> Manejo de Presupuesto</h1>
            <button onClick={() => window.location.href = "/AdminDashboard"}><ArrowLeft size={16} /> Volver a Dashboard</button>
        </header>
        
        <section>
            <h3><DollarSign size={18} /> Balance General Disponible</h3>
            <h1>${balanceTotal.toFixed(2)}</h1>
            <p><TrendingUp size={14} /> Total Ingresos: +${ingresosSuma.toFixed(2)}</p>
            <p><TrendingDown size={14} /> Total Egresos: -${egresosSuma.toFixed(2)}</p>
        </section>

        <section>
            <h3><History size={18} /> Últimos Movimientos Financieros</h3>
            <ul>
                {transacciones.map((t: Transaccion) => (
                    <li key={t.id}>
                        <p><strong>{t.concepto}</strong></p>
                        <p>Fecha: {t.fecha} | Tipo: {t.tipo} | Monto: {t.tipo === 'INGRESO' ? '+' : '-'}${t.monto.toFixed(2)}</p>
                        <hr/>
                    </li>
                ))}
            </ul>
        </section>
      </div>
    </div>
  )
}

export default ManejoPresupuesto