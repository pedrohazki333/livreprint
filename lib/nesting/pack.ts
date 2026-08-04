/**
 * Empacotamento por prateleiras (shelf packing) com rotação 90°, conforme
 * `CLAUDE.md` §2. Escrito do zero — o protótipo do Claude Design varre a
 * folha célula a célula (passo de 1cm) procurando o primeiro espaço livre,
 * que não é "por prateleiras" e não é o algoritmo usado aqui.
 *
 * Ideia: ordena os itens por altura decrescente, preenche uma prateleira
 * (fileira) da largura da folha até não caber mais nenhum item, abre
 * prateleira nova quando acaba a largura, abre folha nova quando acaba a
 * altura. Testa cada item também girado 90°, se permitido, e usa o que
 * couber. Itens travados/manuais entram com posição fixa e viram obstáculo
 * pros itens livres — o resto é reempacotado ao redor deles (a prateleira
 * pula pro primeiro "teto" livre abaixo do obstáculo quando a linha atual
 * não tem espaço suficiente).
 */

const EPS = 0.001;

export type ItemEntrada = {
  id: string;
  larguraCm: number;
  alturaCm: number;
  permiteRotacao: boolean;
  /** Posição já definida (arraste manual ou travamento) — não é reempacotada. */
  posicaoFixa?: { folha: number; x: number; y: number; rotacionado: boolean };
};

export type ConfigEmpacotamento = {
  larguraFolha: number;
  alturaFolha: number;
  gutterCm: number;
  maxFolhas: number;
};

export type ItemPosicionado = {
  id: string;
  folha: number;
  x: number;
  y: number;
  rotacionado: boolean;
  /** Não coube nem sozinho numa folha vazia (mesmo girado). */
  foraDeTamanho: boolean;
};

export type ResultadoEmpacotamento = {
  posicoes: ItemPosicionado[];
  /** Sobrou item sem posição porque estourou o número máximo de folhas. */
  estourouFolhas: boolean;
};

type Retangulo = { folha: number; x: number; y: number; w: number; h: number };
type Prateleira = { y: number; altura: number; cursorX: number };
type Folha = { cursorY: number; prateleiras: Prateleira[] };

export function empacotar(
  itens: ItemEntrada[],
  config: ConfigEmpacotamento,
): ResultadoEmpacotamento {
  const { larguraFolha, alturaFolha, gutterCm, maxFolhas } = config;

  const fixos = itens.filter((i) => i.posicaoFixa);
  const livres = [...itens.filter((i) => !i.posicaoFixa)].sort(
    (a, b) => b.alturaCm - a.alturaCm || b.larguraCm - a.larguraCm,
  );

  const posicoes: ItemPosicionado[] = fixos.map((i) => ({
    id: i.id,
    folha: i.posicaoFixa!.folha,
    x: i.posicaoFixa!.x,
    y: i.posicaoFixa!.y,
    rotacionado: i.posicaoFixa!.rotacionado,
    foraDeTamanho: false,
  }));

  const obstaculos: Retangulo[] = fixos.map((i) => {
    const rot = i.posicaoFixa!.rotacionado;
    return {
      folha: i.posicaoFixa!.folha,
      x: i.posicaoFixa!.x,
      y: i.posicaoFixa!.y,
      w: rot ? i.alturaCm : i.larguraCm,
      h: rot ? i.larguraCm : i.alturaCm,
    };
  });

  const folhas: Folha[] = [];
  const folha = (idx: number): Folha => {
    while (folhas.length <= idx) folhas.push({ cursorY: 0, prateleiras: [] });
    return folhas[idx];
  };

  /** Trechos livres (sem obstáculo) no eixo X, pra uma faixa [y, y+altura] de uma folha. */
  function espacosLivres(
    folhaIdx: number,
    y: number,
    altura: number,
  ): Array<[number, number]> {
    const bloqueios = obstaculos
      .filter(
        (o) =>
          o.folha === folhaIdx &&
          y < o.y + o.h + gutterCm - EPS &&
          o.y < y + altura + gutterCm - EPS,
      )
      .map(
        (o) =>
          [
            Math.max(0, o.x - gutterCm),
            Math.min(larguraFolha, o.x + o.w + gutterCm),
          ] as [number, number],
      )
      .sort((a, b) => a[0] - b[0]);

    const mesclados: Array<[number, number]> = [];
    for (const bloqueio of bloqueios) {
      const ultimo = mesclados[mesclados.length - 1];
      if (ultimo && bloqueio[0] <= ultimo[1] + EPS) {
        ultimo[1] = Math.max(ultimo[1], bloqueio[1]);
      } else {
        mesclados.push([...bloqueio]);
      }
    }

    const livres: Array<[number, number]> = [];
    let cursor = 0;
    for (const [inicio, fim] of mesclados) {
      if (inicio > cursor + EPS) livres.push([cursor, inicio]);
      cursor = Math.max(cursor, fim);
    }
    if (cursor < larguraFolha - EPS) livres.push([cursor, larguraFolha]);
    return livres;
  }

  function tentarNaPrateleira(
    folhaIdx: number,
    prateleira: { y: number; altura: number; cursorX: number },
    w: number,
    h: number,
  ): number | null {
    if (h > prateleira.altura + EPS) return null;
    for (const [inicio, fim] of espacosLivres(folhaIdx, prateleira.y, prateleira.altura)) {
      const x = Math.max(inicio, prateleira.cursorX);
      if (x + w <= fim + EPS) return x;
    }
    return null;
  }

  /** Tenta abrir uma prateleira nova numa folha: na altura atual, ou logo abaixo do próximo obstáculo. */
  function tentarAbrirNaFolha(
    folhaIdx: number,
    w: number,
    h: number,
  ): { x: number; y: number } | null {
    const estado = folha(folhaIdx);
    const candidatosY = [
      estado.cursorY,
      ...obstaculos
        .filter((o) => o.folha === folhaIdx)
        .map((o) => o.y + o.h + gutterCm),
    ]
      .filter((y) => y >= estado.cursorY - EPS)
      .sort((a, b) => a - b);

    for (const y of candidatosY) {
      if (y + h > alturaFolha + EPS) continue;
      const x = tentarNaPrateleira(folhaIdx, { y, altura: h, cursorX: 0 }, w, h);
      if (x !== null) return { x, y };
    }
    return null;
  }

  function colocar(w: number, h: number): { folha: number; x: number; y: number } | null {
    // 1. tenta encaixar numa prateleira já aberta, em qualquer folha existente
    for (let f = 0; f < folhas.length; f++) {
      for (const prateleira of folhas[f].prateleiras) {
        const x = tentarNaPrateleira(f, prateleira, w, h);
        if (x !== null) {
          prateleira.cursorX = x + w + gutterCm;
          return { folha: f, x, y: prateleira.y };
        }
      }
    }

    // 2. tenta abrir prateleira nova — nas folhas já em uso, depois numa folha
    // nova (até o limite de `maxFolhas`)
    const limiteFolhas = Math.min(maxFolhas, Math.max(folhas.length + 1, 1));
    for (let f = 0; f < limiteFolhas; f++) {
      const aberta = tentarAbrirNaFolha(f, w, h);
      if (aberta) {
        const estado = folha(f);
        estado.prateleiras.push({ y: aberta.y, altura: h, cursorX: aberta.x + w + gutterCm });
        estado.cursorY = Math.max(estado.cursorY, aberta.y + h + gutterCm);
        return { folha: f, x: aberta.x, y: aberta.y };
      }
    }

    return null;
  }

  let estourouFolhas = false;

  for (const item of livres) {
    const orientacoes = item.permiteRotacao ? [false, true] : [false];
    let posicionado = false;

    for (const rotacionado of orientacoes) {
      const w = rotacionado ? item.alturaCm : item.larguraCm;
      const h = rotacionado ? item.larguraCm : item.alturaCm;
      if (w > larguraFolha + EPS || h > alturaFolha + EPS) continue;

      const resultado = colocar(w, h);
      if (resultado) {
        posicoes.push({ id: item.id, ...resultado, rotacionado, foraDeTamanho: false });
        posicionado = true;
        break;
      }
      estourouFolhas = true;
    }

    if (!posicionado) {
      const cabeDeAlgumJeito =
        (item.larguraCm <= larguraFolha + EPS && item.alturaCm <= alturaFolha + EPS) ||
        (item.permiteRotacao &&
          item.alturaCm <= larguraFolha + EPS &&
          item.larguraCm <= alturaFolha + EPS);
      posicoes.push({
        id: item.id,
        folha: -1,
        x: 0,
        y: 0,
        rotacionado: false,
        foraDeTamanho: !cabeDeAlgumJeito,
      });
    }
  }

  return { posicoes, estourouFolhas };
}
