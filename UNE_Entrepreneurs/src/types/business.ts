// ============================================================
// Tipos para Gestión de Negocios — UNE
// ============================================================

export interface Transaction {
  id: string;
  userId: string;
  type: 'income' | 'expense' | 'investment';
  category: string;
  description: string;
  amount: number;
  date: string;
}

export interface InventoryItem {
  id: string;
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
