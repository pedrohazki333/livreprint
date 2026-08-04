export type FaixaPreco = {
  min: number;
  max: number | null;
  precoCentavos: number;
};

/**
 * Faixa provisória, válida pra todos os produtos (CLAUDE.md §5).
 * Editável por produto no admin no futuro — por isso é dado, não constante
 * embutida em `precoUnitarioPeca`.
 */
export const TABELA_PADRAO_PECA: FaixaPreco[] = [
  { min: 1, max: 9, precoCentavos: 5990 },
  { min: 10, max: 19, precoCentavos: 4990 },
  { min: 20, max: 29, precoCentavos: 3990 },
  { min: 30, max: 99, precoCentavos: 3690 },
  { min: 100, max: null, precoCentavos: 2990 },
];
