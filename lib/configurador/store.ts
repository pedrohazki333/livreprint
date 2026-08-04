import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { FACES, type FaceNome } from "./faces";

export type Arte = {
  id: string;
  src: string;
  natW: number;
  natH: number;
  w: number;
  h: number;
  x: number;
  y: number;
  rot: 0 | 90 | 180 | 270;
};

type ArtesPorFace = Partial<Record<FaceNome, Arte[]>>;

type Tamanho = { tamanho: string; qtd: number };

type IniciarInput = {
  slug: string;
  produtoNome: string;
  cor: string;
  corHex: string;
  tecido: string;
  tamanhos: Tamanho[];
  precoUnitarioCentavos: number;
  precoTotalCentavos: number;
};

type ConfiguradorState = {
  slug: string | null;
  produtoNome: string | null;
  cor: string | null;
  corHex: string | null;
  tecido: string | null;
  tamanhos: Tamanho[];
  precoUnitarioCentavos: number;
  precoTotalCentavos: number;

  faceAtiva: FaceNome;
  arts: ArtesPorFace;
  selecionadoId: string | null;

  iniciar: (input: IniciarInput) => void;
  setFaceAtiva: (face: FaceNome) => void;
  adicionarArte: (
    face: FaceNome,
    arte: Omit<Arte, "id" | "x" | "y" | "rot" | "w" | "h">,
  ) => void;
  atualizarArte: (id: string, patch: Partial<Omit<Arte, "id">>) => void;
  removerArte: (id: string) => void;
  selecionar: (id: string | null) => void;
  moverCamada: (id: string, direcao: "frente" | "tras") => void;
  limpar: () => void;
};

const arteVazia: ArtesPorFace = {};

/**
 * Referência estável pra usar como fallback em seletores (`s.arts[x] ?? ARTES_VAZIO`).
 * Um `?? []` novo a cada chamada quebra o `useSyncExternalStore` do Zustand —
 * cada snapshot vira uma referência diferente e entra em loop infinito de render.
 */
export const ARTES_VAZIO: Arte[] = [];

export const useConfiguradorStore = create<ConfiguradorState>()(
  persist(
    (set, get) => ({
      slug: null,
      produtoNome: null,
      cor: null,
      corHex: null,
      tecido: null,
      tamanhos: [],
      precoUnitarioCentavos: 0,
      precoTotalCentavos: 0,

      faceAtiva: FACES[0].nome,
      arts: arteVazia,
      selecionadoId: null,

      iniciar: (input) => {
        const mudouProduto = get().slug !== input.slug;
        set({
          slug: input.slug,
          produtoNome: input.produtoNome,
          cor: input.cor,
          corHex: input.corHex,
          tecido: input.tecido,
          tamanhos: input.tamanhos,
          precoUnitarioCentavos: input.precoUnitarioCentavos,
          precoTotalCentavos: input.precoTotalCentavos,
          ...(mudouProduto
            ? { arts: {}, selecionadoId: null, faceAtiva: FACES[0].nome }
            : {}),
        });
      },

      setFaceAtiva: (face) => set({ faceAtiva: face, selecionadoId: null }),

      adicionarArte: (face, arte) => {
        const id = `a${Date.now()}${Math.random().toString(36).slice(2, 6)}`;
        const faceDef = FACES.find((f) => f.nome === face);
        const larguraMax = faceDef ? faceDef.larguraCm * 0.8 : 15;
        const alturaMax = faceDef ? faceDef.alturaCm * 0.8 : 15;
        const ratio = arte.natW / arte.natH;
        let w = Math.min(larguraMax, 20);
        let h = w / ratio;
        if (h > alturaMax) {
          h = alturaMax;
          w = h * ratio;
        }
        const x = faceDef ? (faceDef.larguraCm - w) / 2 : 0;
        const y = faceDef ? (faceDef.alturaCm - h) / 2 : 0;
        set((s) => ({
          arts: {
            ...s.arts,
            [face]: [...(s.arts[face] ?? []), { ...arte, id, w, h, x, y, rot: 0 }],
          },
          selecionadoId: id,
        }));
      },

      atualizarArte: (id, patch) => {
        set((s) => {
          const face = s.faceAtiva;
          const lista = s.arts[face] ?? [];
          return {
            arts: {
              ...s.arts,
              [face]: lista.map((a) => (a.id === id ? { ...a, ...patch } : a)),
            },
          };
        });
      },

      removerArte: (id) => {
        set((s) => {
          const face = s.faceAtiva;
          const lista = s.arts[face] ?? [];
          return {
            arts: { ...s.arts, [face]: lista.filter((a) => a.id !== id) },
            selecionadoId: s.selecionadoId === id ? null : s.selecionadoId,
          };
        });
      },

      selecionar: (id) => set({ selecionadoId: id }),

      moverCamada: (id, direcao) => {
        set((s) => {
          const face = s.faceAtiva;
          const lista = [...(s.arts[face] ?? [])];
          const i = lista.findIndex((a) => a.id === id);
          if (i < 0) return s;
          const alvo = direcao === "frente" ? i + 1 : i - 1;
          if (alvo < 0 || alvo >= lista.length) return s;
          const [item] = lista.splice(i, 1);
          lista.splice(alvo, 0, item);
          return { arts: { ...s.arts, [face]: lista } };
        });
      },

      limpar: () =>
        set({
          slug: null,
          produtoNome: null,
          cor: null,
          corHex: null,
          tecido: null,
          tamanhos: [],
          precoUnitarioCentavos: 0,
          precoTotalCentavos: 0,
          faceAtiva: FACES[0].nome,
          arts: {},
          selecionadoId: null,
        }),
    }),
    {
      name: "lp_peca_configurador",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
