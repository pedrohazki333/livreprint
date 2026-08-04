import type { Produto } from "./types";

export const PRODUTOS: Produto[] = [
  {
    slug: "camiseta",
    nome: "Camiseta",
    categoria: "PEÇA PERSONALIZADA",
    tagline: "Algodão, penteado ou dry-fit",
    descricao:
      "Base neutra e caimento reto, com área de impressão ampla no peito. Ideal pra estampas grandes ou logos discretos.",
    tecidoLabel: "Tecido",
    tecidos: ["Algodão fio 30.1", "Algodão penteado", "Poliéster / dry-fit"],
    cores: [
      { nome: "Branco", hex: "#FFFFFF" },
      { nome: "Preto", hex: "#1B1B18" },
      { nome: "Cinza mescla", hex: "#B9B7AE" },
    ],
    imagemCatalogo: "/mockups/catalog-camiseta.png",
    imagemProduto: "/mockups/produto-camiseta.png",
  },
  {
    slug: "moletom",
    nome: "Moletom",
    categoria: "PEÇA PERSONALIZADA",
    tagline: "Canguru flanelado",
    descricao:
      "Moletom canguru flanelado, com forro macio pra manter a estampa firme mesmo com uso e lavagens frequentes.",
    tecidoLabel: "Tecido",
    tecidos: ["Moletom flanelado"],
    cores: [
      { nome: "Branco", hex: "#FFFFFF" },
      { nome: "Preto", hex: "#1B1B18" },
      { nome: "Cinza mescla", hex: "#B9B7AE" },
    ],
    imagemCatalogo: "/mockups/catalog-moletom.png",
    imagemProduto: "/mockups/produto-moletom.png",
  },
  {
    slug: "polo",
    nome: "Polo",
    categoria: "PEÇA PERSONALIZADA",
    tagline: "Piquet 100% algodão",
    descricao:
      "Polo em piquet com colarinho estruturado — acabamento mais elegante pra uniformes e eventos corporativos.",
    tecidoLabel: "Tecido",
    tecidos: ["Piquet 100% algodão"],
    cores: [
      { nome: "Branco", hex: "#FFFFFF" },
      { nome: "Preto", hex: "#1B1B18" },
      { nome: "Azul marinho", hex: "#1E3A5F" },
    ],
    imagemCatalogo: "/mockups/catalog-polo.png",
    imagemProduto: "/mockups/produto-polo.png",
  },
];

export const TAMANHOS = ["P", "M", "G", "GG"] as const;
export type Tamanho = (typeof TAMANHOS)[number];

export function getProduto(slug: string): Produto | undefined {
  return PRODUTOS.find((p) => p.slug === slug);
}
