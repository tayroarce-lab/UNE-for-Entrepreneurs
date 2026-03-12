// ============================================================
// Utilidad: Verificación de elegibilidad
// ============================================================
import type { Eligibility, UserProfile, EligibilityCheck } from '../types/financing';

/**
 * Verifica si un perfil de usuario califica para un programa de financiamiento
 * según los criterios de elegibilidad del programa.
 *
 * Reglas:
 * - region: user.region debe estar en eligibility.regions o ser "Nacional"
 * - sector: user.sector debe intersectar con eligibility.sectors (vacío = cualquiera)
 * - minRevenue: user.annualRevenue >= minRevenue (si existe)
 * - maxEmployees: user.employees <= maxEmployees (si existe)
 * - legalStatus: si el programa requiere "formal", el user debe ser "formal"
 */
export function checkEligibility(
  userProfile: UserProfile,
  eligibility: Eligibility
): EligibilityCheck {
  const reasons: string[] = [];
  const missingFields: string[] = [];
  let allPass = true;
  let hasPossibly = false;

  // 1. Verificar región
  if (eligibility.regions.length > 0) {
    const regionasNormalizadas = eligibility.regions.map((r) => r.toLowerCase());
    if (regionasNormalizadas.includes('nacional')) {
      // Nacional = cualquier región califica
    } else if (!userProfile.region) {
      missingFields.push('Región');
      hasPossibly = true;
    } else if (!regionasNormalizadas.includes(userProfile.region.toLowerCase())) {
      reasons.push(
        `No califica: su región "${userProfile.region}" no está incluida en las regiones del programa (${eligibility.regions.join(', ')})`
      );
      allPass = false;
    }
  }

  // 2. Verificar sector
  if (eligibility.sectors.length > 0) {
    if (!userProfile.sector) {
      missingFields.push('Sector económico');
      hasPossibly = true;
    } else {
      const sectoresNormalizados = eligibility.sectors.map((s) => s.toLowerCase());
      if (!sectoresNormalizados.includes(userProfile.sector.toLowerCase())) {
        reasons.push(
          `No califica: su sector "${userProfile.sector}" no está incluido en los sectores del programa (${eligibility.sectors.join(', ')})`
        );
        allPass = false;
      }
    }
  }

  // 3. Verificar ingreso mínimo
  if (eligibility.minRevenue !== null && eligibility.minRevenue !== undefined) {
    if (userProfile.annualRevenue === null || userProfile.annualRevenue === undefined) {
      missingFields.push('Ingreso anual');
      hasPossibly = true;
    } else if (userProfile.annualRevenue < eligibility.minRevenue) {
      reasons.push(
        `No califica: su ingreso anual (₡${userProfile.annualRevenue.toLocaleString('es-CR')}) es menor al mínimo requerido (₡${eligibility.minRevenue.toLocaleString('es-CR')})`
      );
      allPass = false;
    }
  }

  // 4. Verificar máximo de empleados
  if (eligibility.maxEmployees !== null && eligibility.maxEmployees !== undefined) {
    if (userProfile.employees === null || userProfile.employees === undefined) {
      missingFields.push('Número de empleados');
      hasPossibly = true;
    } else if (userProfile.employees > eligibility.maxEmployees) {
      reasons.push(
        `No califica: su número de empleados (${userProfile.employees}) excede el máximo permitido (${eligibility.maxEmployees})`
      );
      allPass = false;
    }
  }

  // 5. Verificar estatus legal
  if (eligibility.legalStatus && eligibility.legalStatus !== 'any') {
    if (!userProfile.legalStatus) {
      missingFields.push('Estatus legal');
      hasPossibly = true;
    } else if (
      eligibility.legalStatus === 'formal' &&
      userProfile.legalStatus !== 'formal'
    ) {
      reasons.push(
        'No califica: el programa requiere estatus legal "formal"'
      );
      allPass = false;
    }
  }

  // Determinar resultado
  if (!allPass) {
    return { result: 'does_not_qualify', reasons, missingFields };
  }

  if (hasPossibly) {
    if (missingFields.length > 0) {
      reasons.push(
        `Información faltante: ${missingFields.join(', ')}. Complete estos campos para una verificación exacta.`
      );
    }
    return { result: 'possibly', reasons, missingFields };
  }

  reasons.push('¡Felicidades! Cumple con todos los criterios de elegibilidad del programa.');
  return { result: 'qualifies', reasons, missingFields };
}

/**
 * Sanitiza HTML para prevenir XSS
 */
export function sanitizeHtml(html: string): string {
  // Eliminar tags de script y event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

/**
 * Formatea un número como moneda en colones costarricenses
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formatea una fecha ISO a formato legible en español
 */
export function formatDate(isoDate: string): string {
  if (!isoDate) return '—';
  const date = new Date(isoDate);
  return date.toLocaleDateString('es-CR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Valida que una URL tenga formato correcto
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
