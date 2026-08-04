import type { ItemCarrinho } from "./store";

/** Descrição curta de um item do carrinho, pra listas de resumo. */
export function descricaoItemCarrinho(item: ItemCarrinho): string {
  if (item.tipo === "peca_personalizada") {
    return `${item.produtoNome} · ${item.cor} · ${item.totalQty} peça(s)`;
  }
  return `DTF por metro · ${item.metragemCobradaCm} cm (${item.folhas} folha${item.folhas > 1 ? "s" : ""})`;
}
