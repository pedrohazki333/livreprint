const PRECO_METRO_CENTAVOS = 6990;
const METRAGEM_MINIMA_CM = 30;
const ARREDONDAMENTO_CM = 5;

export type PrecoDtf = {
  metragemCobradaCm: number;
  totalCentavos: number;
};

/**
 * Preço (em centavos) de uma folha de DTF por metro, a partir do comprimento
 * de filme efetivamente usado. Arredonda pra cima em passos de 5cm, com
 * mínimo de 30cm por folha, e cobra proporcional (CLAUDE.md §5).
 */
export function precoDtf(metragemUsadaCm: number): PrecoDtf {
  if (metragemUsadaCm <= 0) {
    return { metragemCobradaCm: 0, totalCentavos: 0 };
  }

  const arredondada =
    Math.ceil(metragemUsadaCm / ARREDONDAMENTO_CM) * ARREDONDAMENTO_CM;
  const metragemCobradaCm = Math.max(METRAGEM_MINIMA_CM, arredondada);
  const totalCentavos = Math.round(
    (metragemCobradaCm * PRECO_METRO_CENTAVOS) / 100,
  );

  return { metragemCobradaCm, totalCentavos };
}
