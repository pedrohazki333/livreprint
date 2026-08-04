export type CorProduto = {
  nome: string;
  hex: string;
};

export type Produto = {
  slug: string;
  nome: string;
  categoria: string;
  tagline: string;
  descricao: string;
  tecidoLabel: string;
  tecidos: string[];
  cores: CorProduto[];
  imagemCatalogo: string;
  imagemProduto: string;
};
