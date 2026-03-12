// ============================================================
// Tipos para el módulo de Financiamientos — UNE Costa Rica
// ============================================================

export type FinancingType = 'loan' | 'grant' | 'subsidy' | 'equity' | 'other';
export type FinancingStatus = 'active' | 'closed' | 'upcoming';
export type LegalStatus = 'formal' | 'informal' | 'any';

export interface Eligibility {
  regions: string[];
  sectors: string[];
  minRevenue: number | null;
  maxEmployees: number | null;
  legalStatus: LegalStatus;
}

export interface Contact {
  email: string;
  phone: string;
  officeUrl?: string;
}

export interface Attachment {
  name: string;
  url: string;
}

export interface FinancingProgram {
  id?: string;
  name: string;
  type: FinancingType;
  amountRange: string;
  minAmount: number;
  maxAmount: number;
  eligibility: Eligibility;
  requirements: string[];
  region: string;
  applicationLink: string;
  howToApply: string;
  contact: Contact;
  tags: string[];
  status: FinancingStatus;
  lastVerified: string;
  sourceUrl: string;
  notes?: string;
  createdBy?: string;
  attachments?: Attachment[];
  closedReason?: string;
}

export interface Application {
  id?: string;
  programId: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface Report {
  id?: string;
  programId: string;
  userId?: string;
  note: string;
  createdAt: string;
}

export interface Favorite {
  id?: string;
  userId: string;
  programId: string;
  createdAt: string;
}

export interface UserBudgetEntry {
  id?: string;
  userId: string;
  programId: string;
  programName: string;
  estimatedAmount: number;
  type: 'income';
  date: string;
  note: string;
}

// Perfil del usuario para verificar elegibilidad
export interface UserProfile {
  region: string;
  sector: string;
  annualRevenue: number | null;
  employees: number | null;
  legalStatus: 'formal' | 'informal';
}

// Resultado de elegibilidad
export type EligibilityResult = 'qualifies' | 'does_not_qualify' | 'possibly';

export interface EligibilityCheck {
  result: EligibilityResult;
  reasons: string[];
  missingFields: string[];
}

// Filtros para la lista
export interface FinancingFilters {
  q: string;
  type: FinancingType | '';
  region: string;
  tags: string[];
  minAmountFilter: number | null;
  maxAmountFilter: number | null;
  status: FinancingStatus | '';
  page: number;
  limit: number;
}

// Constantes del módulo
export const FINANCING_TYPES: Record<FinancingType, string> = {
  loan: 'Crédito',
  grant: 'Donación',
  subsidy: 'Subsidio',
  equity: 'Capital',
  other: 'Otro',
};

export const FINANCING_STATUS: Record<FinancingStatus, string> = {
  active: 'Activo',
  closed: 'Cerrado',
  upcoming: 'Próximamente',
};

export const REGIONS = [
  'Nacional',
  'San José',
  'Alajuela',
  'Cartago',
  'Heredia',
  'Guanacaste',
  'Puntarenas',
  'Limón',
];

export const SECTORS = [
  'comercio',
  'servicios',
  'agricultura',
  'tecnología',
  'turismo',
  'manufactura',
  'agroindustria',
  'artesanía',
  'educación',
  'salud',
  'construcción',
  'transporte',
];
