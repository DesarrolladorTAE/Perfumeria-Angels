export const PALETTE = {
  accent: "#E94B7C",
  soft: "#F8D8E0",
  grey: "#5A5A5A",
  white: "#FFFFFF",
};

export function moneyMXN(v) {
  const n = Number(v || 0);
  try {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `$${Math.round(n)} MXN`;
  }
}

/**
 * discount:
 * - 0 < d <= 100 => porcentaje
 * - d > 100 => monto absoluto
 */
export function calcDiscount(price, discount) {
  const p = Number(price || 0);
  const d = Number(discount || 0);
  if (!d || d <= 0) return { has: false, final: p, saved: 0, pct: 0 };

  if (d > 0 && d <= 100) {
    const saved = (p * d) / 100;
    const final = Math.max(0, p - saved);
    return { has: true, final, saved, pct: d };
  }

  const saved = Math.min(p, d);
  const final = Math.max(0, p - saved);
  const pct = p ? Math.round((saved / p) * 100) : 0;
  return { has: true, final, saved, pct };
}

export function pickCover(images) {
  const arr = Array.isArray(images) ? images : [];
  return arr.find(Boolean) || "";
}
