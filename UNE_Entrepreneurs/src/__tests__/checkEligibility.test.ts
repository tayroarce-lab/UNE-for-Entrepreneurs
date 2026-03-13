// ============================================================
// Tests unitarios — checkEligibility
// ============================================================
// Ejecutar: npx tsx src/__tests__/checkEligibility.test.ts
// O con un test runner como vitest

import { checkEligibility } from '../utils/financingUtils';
import type { Eligibility, UserProfile } from '../types/financing';

// ---- Helpers ----
let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✅ ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ ${testName}`);
    failed++;
  }
}

// ---- Test Data ----
const eligibility: Eligibility = {
  regions: ['Nacional'],
  sectors: ['comercio', 'servicios'],
  minRevenue: 5000000,
  maxEmployees: 50,
  legalStatus: 'formal',
};

// ============ TEST SUITE ============

console.log('\n🧪 Test Suite: checkEligibility\n');

// ---- Test 1: Usuario que califica completamente ----
console.log('📋 Test 1: Usuario califica completamente');
{
  const user: UserProfile = {
    region: 'San José',
    sector: 'comercio',
    annualRevenue: 10000000,
    employees: 30,
    legalStatus: 'formal',
  };
  const result = checkEligibility(user, eligibility);
  assert(result.result === 'qualifies', 'Resultado es "qualifies"');
  assert(result.missingFields.length === 0, 'Sin campos faltantes');
}

// ---- Test 2: Usuario no califica por región ----
console.log('\n📋 Test 2: No califica por región');
{
  const eligRegional: Eligibility = {
    ...eligibility,
    regions: ['Limón', 'Guanacaste'],
  };
  const user: UserProfile = {
    region: 'San José',
    sector: 'comercio',
    annualRevenue: 10000000,
    employees: 30,
    legalStatus: 'formal',
  };
  const result = checkEligibility(user, eligRegional);
  assert(result.result === 'does_not_qualify', 'Resultado es "does_not_qualify"');
  assert(result.reasons.some((r) => r.includes('región')), 'Razón menciona región');
}

// ---- Test 3: Usuario no califica por sector ----
console.log('\n📋 Test 3: No califica por sector');
{
  const user: UserProfile = {
    region: 'San José',
    sector: 'agricultura',
    annualRevenue: 10000000,
    employees: 30,
    legalStatus: 'formal',
  };
  const result = checkEligibility(user, eligibility);
  assert(result.result === 'does_not_qualify', 'Resultado es "does_not_qualify"');
  assert(result.reasons.some((r) => r.includes('sector')), 'Razón menciona sector');
}

// ---- Test 4: Usuario no califica por ingreso bajo ----
console.log('\n📋 Test 4: No califica por ingreso insuficiente');
{
  const user: UserProfile = {
    region: 'San José',
    sector: 'comercio',
    annualRevenue: 2000000,
    employees: 30,
    legalStatus: 'formal',
  };
  const result = checkEligibility(user, eligibility);
  assert(result.result === 'does_not_qualify', 'Resultado es "does_not_qualify"');
  assert(result.reasons.some((r) => r.includes('ingreso')), 'Razón menciona ingreso');
}

// ---- Test 5: Usuario no califica por exceso de empleados ----
console.log('\n📋 Test 5: No califica por exceso de empleados');
{
  const user: UserProfile = {
    region: 'San José',
    sector: 'comercio',
    annualRevenue: 10000000,
    employees: 100,
    legalStatus: 'formal',
  };
  const result = checkEligibility(user, eligibility);
  assert(result.result === 'does_not_qualify', 'Resultado es "does_not_qualify"');
  assert(result.reasons.some((r) => r.includes('empleados')), 'Razón menciona empleados');
}

// ---- Test 6: Usuario no califica por estatus legal ----
console.log('\n📋 Test 6: No califica por estatus legal');
{
  const user: UserProfile = {
    region: 'San José',
    sector: 'comercio',
    annualRevenue: 10000000,
    employees: 30,
    legalStatus: 'informal',
  };
  const result = checkEligibility(user, eligibility);
  assert(result.result === 'does_not_qualify', 'Resultado es "does_not_qualify"');
  assert(result.reasons.some((r) => r.includes('formal')), 'Razón menciona formal');
}

// ---- Test 7: Resultado "Posiblemente" — datos faltantes ----
console.log('\n📋 Test 7: Posiblemente califica (datos faltantes)');
{
  const user: UserProfile = {
    region: 'San José',
    sector: 'comercio',
    annualRevenue: null,
    employees: null,
    legalStatus: 'formal',
  };
  const result = checkEligibility(user, eligibility);
  assert(result.result === 'possibly', 'Resultado es "possibly"');
  assert(result.missingFields.length > 0, 'Hay campos faltantes');
  assert(
    result.missingFields.includes('Ingreso anual'),
    'Falta ingreso anual'
  );
  assert(
    result.missingFields.includes('Número de empleados'),
    'Falta número de empleados'
  );
}

// ---- Test 8: Califica con "Nacional" en regiones ----
console.log('\n📋 Test 8: Nacional = cualquier región');
{
  const user: UserProfile = {
    region: 'Limón',
    sector: 'comercio',
    annualRevenue: 10000000,
    employees: 30,
    legalStatus: 'formal',
  };
  const result = checkEligibility(user, eligibility);
  assert(result.result === 'qualifies', 'Califica con región Limón para programa Nacional');
}

// ---- Test 9: Sectores vacíos = cualquier sector ----
console.log('\n📋 Test 9: Sectors vacío = cualquiera');
{
  const eligAny: Eligibility = {
    ...eligibility,
    sectors: [],
    minRevenue: null,
    maxEmployees: null,
    legalStatus: 'any',
  };
  const user: UserProfile = {
    region: 'San José',
    sector: 'agroindustria',
    annualRevenue: null,
    employees: null,
    legalStatus: 'informal',
  };
  const result = checkEligibility(user, eligAny);
  assert(result.result === 'qualifies', 'Califica con requisitos abiertos');
}

// ---- Test 10: Múltiples razones de no calificación ----
console.log('\n📋 Test 10: Múltiples razones de no calificación');
{
  const eligStrict: Eligibility = {
    regions: ['Heredia'],
    sectors: ['tecnología'],
    minRevenue: 20000000,
    maxEmployees: 5,
    legalStatus: 'formal',
  };
  const user: UserProfile = {
    region: 'San José',
    sector: 'agricultura',
    annualRevenue: 1000000,
    employees: 50,
    legalStatus: 'informal',
  };
  const result = checkEligibility(user, eligStrict);
  assert(result.result === 'does_not_qualify', 'No califica');
  assert(result.reasons.length >= 4, 'Al menos 4 razones de no calificación');
}

// ---- Summary ----
console.log('\n' + '='.repeat(50));
console.log(`📊 Resultados: ${passed} passed, ${failed} failed de ${passed + failed} tests`);
console.log('='.repeat(50));

if (failed > 0) {
  // En entorno CLI se puede reactivar: process.exit(1);
}
