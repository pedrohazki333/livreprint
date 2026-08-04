/**
 * Posições de estampa suportadas nesta fase — nomes vêm do contrato de dados
 * (`CLAUDE.md` §7, `Posicionamento.nome`), não do protótipo. O protótipo tem
 * "peito direito" (fora do contrato) e o contrato tem "nuca" (sem nenhuma
 * medida de referência em lugar nenhum) — nenhum dos dois entra aqui.
 *
 * As dimensões em cm vêm da calibração real usada no protótipo pra camiseta.
 */
export type FaceNome =
  | "frente"
  | "costas"
  | "manga_e"
  | "manga_d"
  | "peito_esquerdo";

export type FaceDef = {
  nome: FaceNome;
  label: string;
  larguraCm: number;
  alturaCm: number;
};

export const FACES: FaceDef[] = [
  { nome: "frente", label: "Frente", larguraCm: 30, alturaCm: 40 },
  { nome: "costas", label: "Costas", larguraCm: 30, alturaCm: 40 },
  { nome: "manga_e", label: "Manga esquerda", larguraCm: 8, alturaCm: 10 },
  { nome: "manga_d", label: "Manga direita", larguraCm: 8, alturaCm: 10 },
  { nome: "peito_esquerdo", label: "Peito esquerdo", larguraCm: 10, alturaCm: 10 },
];

/** Pixels por centímetro na tela do editor. */
export const PPC = 8;

export function getFace(nome: FaceNome): FaceDef {
  const face = FACES.find((f) => f.nome === nome);
  if (!face) throw new Error(`posição desconhecida: ${nome}`);
  return face;
}

/**
 * Só a camiseta tem mockup calibrado por enquanto — moletom e polo reusam a
 * mesma área por posição, mas mostram um aviso, igual ao protótipo.
 */
export function mockupEmPreparacao(produtoSlug: string): boolean {
  return produtoSlug !== "camiseta";
}
