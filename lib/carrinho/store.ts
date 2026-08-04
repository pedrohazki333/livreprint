import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ItemCarrinho = {
  id: string;
  tipo: "peca_personalizada";
  produtoNome: string;
  cor: string;
  qtyLabel: string;
  totalQty: number;
  precoTotalCentavos: number;
};

type CarrinhoState = {
  itens: ItemCarrinho[];
  adicionarItem: (item: Omit<ItemCarrinho, "id">) => void;
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
            { ...item, id: `c${Date.now()}${Math.random().toString(36).slice(2, 6)}` },
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
