import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { empacotar, type ItemEntrada } from "@/lib/nesting/pack";
import { FILME } from "@/lib/constants";

export type ArteDtf = {
  id: string;
  src: string;
  natW: number;
  natH: number;
  larguraCm: number;
  qtd: number;
};

export type PecaDtf = {
  id: string;
  artId: string;
  larguraCm: number;
  alturaCm: number;
  x: number;
  y: number;
  folha: number;
  rotacionado: boolean;
  espelhada: boolean;
  manual: boolean;
  travada: boolean;
  foraDeTamanho: boolean;
};

/** Pixels por centímetro no palco de montagem (folha é bem maior que uma face de peça). */
export const PPC_DTF = 6;

const CONFIG_FOLHA = {
  larguraFolha: FILME.LARGURA_UTIL_CM,
  alturaFolha: FILME.ALTURA_CHAPA_CM,
  gutterCm: FILME.GUTTER_CM,
  maxFolhas: FILME.MAX_CHAPAS,
};

function criarPecaNova(arte: ArteDtf, alturaCm: number): PecaDtf {
  return {
    id: `p${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
    artId: arte.id,
    larguraCm: arte.larguraCm,
    alturaCm,
    x: 0,
    y: 0,
    folha: 0,
    rotacionado: false,
    espelhada: false,
    manual: false,
    travada: false,
    foraDeTamanho: false,
  };
}

/** Garante uma peça por unidade de `qtd` de cada arte, reaproveitando peças já existentes. */
function sincronizarPecas(arts: ArteDtf[], pecasAtuais: PecaDtf[]): PecaDtf[] {
  const resultado: PecaDtf[] = [];
  for (const arte of arts) {
    const alturaCm = arte.larguraCm / (arte.natW / arte.natH);
    const existentes = pecasAtuais.filter((p) => p.artId === arte.id);
    const fixas = existentes
      .filter((p) => p.manual || p.travada)
      .slice(0, arte.qtd)
      .map((p) => ({ ...p, larguraCm: arte.larguraCm, alturaCm }));
    resultado.push(...fixas);

    const livres = existentes.filter((p) => !p.manual && !p.travada);
    const faltam = Math.max(0, arte.qtd - fixas.length);
    for (let i = 0; i < faltam; i++) {
      const reaproveitada = livres[i];
      resultado.push(
        reaproveitada
          ? { ...reaproveitada, larguraCm: arte.larguraCm, alturaCm }
          : criarPecaNova(arte, alturaCm),
      );
    }
  }
  return resultado;
}

function posicionar(pecas: PecaDtf[]): { pecas: PecaDtf[]; estourouFolhas: boolean } {
  const itens: ItemEntrada[] = pecas.map((p) => ({
    id: p.id,
    larguraCm: p.larguraCm,
    alturaCm: p.alturaCm,
    permiteRotacao: FILME.ROTACAO_90_PERMITIDA,
    posicaoFixa:
      p.manual || p.travada
        ? { folha: p.folha, x: p.x, y: p.y, rotacionado: p.rotacionado }
        : undefined,
  }));
  const { posicoes, estourouFolhas } = empacotar(itens, CONFIG_FOLHA);
  const porId = new Map(posicoes.map((pos) => [pos.id, pos]));

  return {
    pecas: pecas.map((p) => {
      const pos = porId.get(p.id)!;
      return {
        ...p,
        folha: pos.folha,
        x: pos.x,
        y: pos.y,
        rotacionado: pos.rotacionado,
        foraDeTamanho: pos.foraDeTamanho,
      };
    }),
    estourouFolhas,
  };
}

type MontagemDtfState = {
  arts: ArteDtf[];
  pecas: PecaDtf[];
  folhaAtiva: number;
  selecionadoId: string | null;
  estourouFolhas: boolean;

  adicionarArte: (input: { src: string; natW: number; natH: number }) => void;
  atualizarLarguraArte: (artId: string, larguraCm: number) => void;
  atualizarQtdArte: (artId: string, qtd: number) => void;
  removerArte: (artId: string) => void;

  selecionar: (id: string | null) => void;
  setFolhaAtiva: (folha: number) => void;
  atualizarPosicaoPeca: (id: string, patch: { x?: number; y?: number }) => void;
  rotacionarPeca: (id: string) => void;
  espelharPeca: (id: string) => void;
  alinharPeca: (id: string, modo: "esquerda" | "centro" | "direita") => void;
  toggleTravarPeca: (id: string) => void;
  duplicarPeca: (id: string) => void;
  removerPeca: (id: string) => void;

  reencaixarTudo: () => void;
  limparTudo: () => void;
};

export const useMontagemDtfStore = create<MontagemDtfState>()(
  persist(
    (set, get) => ({
      arts: [],
      pecas: [],
      folhaAtiva: 0,
      selecionadoId: null,
      estourouFolhas: false,

      adicionarArte: ({ src, natW, natH }) => {
        const larguraCm = Math.min(20, FILME.LARGURA_UTIL_CM);
        const arte: ArteDtf = {
          id: `a${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
          src,
          natW,
          natH,
          larguraCm,
          qtd: 1,
        };
        const arts = [...get().arts, arte];
        const sincronizadas = sincronizarPecas(arts, get().pecas);
        const { pecas, estourouFolhas } = posicionar(sincronizadas);
        set({ arts, pecas, estourouFolhas });
      },

      atualizarLarguraArte: (artId, larguraCm) => {
        const valor = Math.min(FILME.LARGURA_UTIL_CM, Math.max(1, larguraCm));
        const arts = get().arts.map((a) => (a.id === artId ? { ...a, larguraCm: valor } : a));
        const sincronizadas = sincronizarPecas(arts, get().pecas);
        const { pecas, estourouFolhas } = posicionar(sincronizadas);
        set({ arts, pecas, estourouFolhas });
      },

      atualizarQtdArte: (artId, qtd) => {
        const valor = Math.max(1, Math.min(200, Math.round(qtd)));
        const arts = get().arts.map((a) => (a.id === artId ? { ...a, qtd: valor } : a));
        const sincronizadas = sincronizarPecas(arts, get().pecas);
        const { pecas, estourouFolhas } = posicionar(sincronizadas);
        set({ arts, pecas, estourouFolhas });
      },

      removerArte: (artId) => {
        const arts = get().arts.filter((a) => a.id !== artId);
        const pecas = get().pecas.filter((p) => p.artId !== artId);
        const { pecas: posicionadas, estourouFolhas } = posicionar(sincronizarPecas(arts, pecas));
        set({ arts, pecas: posicionadas, estourouFolhas, selecionadoId: null });
      },

      selecionar: (id) => set({ selecionadoId: id }),
      setFolhaAtiva: (folha) => set({ folhaAtiva: folha, selecionadoId: null }),

      atualizarPosicaoPeca: (id, patch) =>
        set((s) => ({
          pecas: s.pecas.map((p) => (p.id === id ? { ...p, ...patch, manual: true } : p)),
        })),

      rotacionarPeca: (id) =>
        set((s) => ({
          pecas: s.pecas.map((p) =>
            p.id === id ? { ...p, rotacionado: !p.rotacionado, manual: true } : p,
          ),
        })),

      espelharPeca: (id) =>
        set((s) => ({
          pecas: s.pecas.map((p) =>
            p.id === id ? { ...p, espelhada: !p.espelhada, manual: true } : p,
          ),
        })),

      alinharPeca: (id, modo) =>
        set((s) => ({
          pecas: s.pecas.map((p) => {
            if (p.id !== id) return p;
            const w = p.rotacionado ? p.alturaCm : p.larguraCm;
            const x =
              modo === "esquerda"
                ? 0
                : modo === "direita"
                  ? FILME.LARGURA_UTIL_CM - w
                  : (FILME.LARGURA_UTIL_CM - w) / 2;
            return { ...p, x: Math.max(0, x), manual: true };
          }),
        })),

      toggleTravarPeca: (id) =>
        set((s) => ({
          pecas: s.pecas.map((p) => (p.id === id ? { ...p, travada: !p.travada } : p)),
        })),

      duplicarPeca: (id) => {
        const peca = get().pecas.find((p) => p.id === id);
        if (!peca) return;
        const arts = get().arts.map((a) => (a.id === peca.artId ? { ...a, qtd: a.qtd + 1 } : a));
        const sincronizadas = sincronizarPecas(arts, get().pecas);
        const { pecas, estourouFolhas } = posicionar(sincronizadas);
        set({ arts, pecas, estourouFolhas });
      },

      removerPeca: (id) => {
        const peca = get().pecas.find((p) => p.id === id);
        if (!peca) return;
        const arts = get()
          .arts.map((a) => (a.id === peca.artId ? { ...a, qtd: Math.max(0, a.qtd - 1) } : a))
          .filter((a) => a.qtd > 0);
        const pecasSemEssa = get().pecas.filter((p) => p.id !== id);
        const sincronizadas = sincronizarPecas(arts, pecasSemEssa);
        const { pecas, estourouFolhas } = posicionar(sincronizadas);
        set({ arts, pecas, estourouFolhas, selecionadoId: null });
      },

      reencaixarTudo: () => {
        const limpas = get().pecas.map((p) => (p.travada ? p : { ...p, manual: false }));
        const { pecas, estourouFolhas } = posicionar(limpas);
        set({ pecas, estourouFolhas, selecionadoId: null });
      },

      limparTudo: () =>
        set({ arts: [], pecas: [], folhaAtiva: 0, selecionadoId: null, estourouFolhas: false }),
    }),
    {
      name: "lp_dtf_montagem",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
