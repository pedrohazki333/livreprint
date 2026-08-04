import { TABELA_PADRAO_PECA, type FaixaPreco } from "./tabela-padrao";

/**
 * Preço unitário (em centavos) de uma peça personalizada.
 *
 * A faixa é por produto, calculada só pela quantidade daquele produto — a
 * personalização (posições de estampa) já está embutida no preço e não
 * cobra extra. Não confundir com o protótipo do Claude Design, que soma um
 * valor por face: isso é placeholder do protótipo e contraria a regra real
 * (CLAUDE.md §5).
 */
export function precoUnitarioPeca(
  quantidade: number,
  tabela: FaixaPreco[] = TABELA_PADRAO_PECA,
): number {
  if (!Number.isInteger(quantidade) || quantidade < 1) {
    throw new RangeError("quantidade deve ser um inteiro >= 1");
  }

  const faixa = tabela.find(
    (f) => quantidade >= f.min && (f.max === null || quantidade <= f.max),
  );
  if (!faixa) {
    throw new RangeError(
      `nenhuma faixa de preço cobre a quantidade ${quantidade}`,
    );
  }
  return faixa.precoCentavos;
}

/** Preço total (em centavos) pra uma quantidade de peças de um mesmo produto. */
export function precoTotalPeca(
  quantidade: number,
  tabela?: FaixaPreco[],
): number {
  return precoUnitarioPeca(quantidade, tabela) * quantidade;
}
