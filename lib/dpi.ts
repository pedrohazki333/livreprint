export type FaixaDpi = "otima" | "aceitavel" | "baixa";

/** DPI efetivo de uma arte no tamanho de impressão atual. */
export function calcularDpi(natW: number, larguraCm: number): number {
  return Math.round(natW / (larguraCm / 2.54));
}

export function faixaDpi(dpi: number): FaixaDpi {
  if (dpi >= 300) return "otima";
  if (dpi >= 150) return "aceitavel";
  return "baixa";
}
