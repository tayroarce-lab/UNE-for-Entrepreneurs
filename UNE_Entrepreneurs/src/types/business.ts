// ============================================================
// Tipos para Gestión de Negocios — UNE
// ============================================================

export interface Transaction {
  id: string | number;
  userId?: string;
  type?: 'income' | 'expense' | 'investment';
  category: string;
  description: string;
  subDescription?: string;
  amount: number; // En IngresosEgresos puede ser positivo/negativo, en FinanzasPanel se usa type para clasificar
  date: string;
  status?: 'Completado' | 'Pendiente';
}

export interface InventoryItem {
  id: string | number;
  userId: string;
  name: string;
  quantity: number;
  minQuantity: number;
  costPrice: number;
  salePrice: number;
  category: string;
  lastRestock: string;
}

export interface BusinessSummary {
  totalIncome: number;
  totalExpenses: number;
  totalInvestments: number;
  netProfit: number;
  profitMargin: number;
}
