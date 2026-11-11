function trimDecimal(value: number): string {
  return value % 1 === 0 ? String(value) : value.toFixed(1);
}

/** Formats a token count compactly: 950 -> "950", 12300 -> "12.3k", 1500000 -> "1.5M". */
export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${trimDecimal(n / 1_000_000)}M`;
  if (n >= 1000) return `${trimDecimal(n / 1000)}k`;
  return String(Math.round(n));
}

/** 'error' past 90% used, 'warning' past 70%, else the default text color; unknown (not yet measured) reads as default. */
export function usageColor(percent: number | undefined): string {
  if (percent === undefined) return 'text';
  if (percent >= 90) return 'error';
  if (percent >= 70) return 'warning';
  return 'text';
}

/** A filled/empty block bar, `width` cells wide, proportional to percent (empty when percent is unknown). */
export function progressBar(percent: number | undefined, width: number): string {
  const clamped = Math.max(0, Math.min(100, percent ?? 0));
  const filled = Math.round((clamped / 100) * width);
  return '█'.repeat(filled) + '░'.repeat(Math.max(0, width - filled));
}
