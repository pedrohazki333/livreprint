import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ItemCarrinhoPeca = {
  id: string;
  tipo: "peca_personalizada";
  produtoNome: string;
  cor: string;
  qtyLabel: string;
  totalQty: number;
  precoTotalCentavos: number;
};

export type ItemCarrinhoDtf = {
  id: string;
  tipo: "filme_dtf";
  folhas: number;
  metragemCobradaCm: number;
  precoTotalCentavos: number;
};

/** Mesmo formato de `Pedido.itens` do contrato de dados (`CLAUDE.md` §7). */
export type ItemCarrinho = ItemCarrinhoPeca | ItemCarrinhoDtf;

type SemId<T> = T extends unknown ? Omit<T, "id"> : never;

type CarrinhoState = {
  itens: ItemCarrinho[];
  adicionarItem: (item: SemId<ItemCarrinho>) => void;
};

/**
 * Carrinho mínimo — só guarda os itens já revisados. A tela de checkout de
 * verdade (ler isso e fechar pedido) é escopo da Fase 4.
 */
export const useCarrinhoStore = create<CarrinhoState>()(
  persist(
    (set) => ({
      itens: [],
      adicionarItem: (item) =>
        set((s) => ({
          itens: [
            ...s.itens,
            { ...item, id: `c${Date.now()}${Math.random().toString(36).slice(2, 6)}` } as ItemCarrinho,
          ],
        })),
    }),
    {
      name: "lp_carrinho",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
