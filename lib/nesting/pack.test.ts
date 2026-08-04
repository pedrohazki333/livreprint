import { describe, expect, it } from "vitest";
import { empacotar, type ItemEntrada } from "./pack";

const CONFIG_PADRAO = {
  larguraFolha: 56,
  alturaFolha: 100,
  gutterCm: 0.5,
  maxFolhas: 5,
};

describe("empacotar", () => {
  it("posiciona um item único na origem da primeira folha", () => {
    const itens: ItemEntrada[] = [
      { id: "a", larguraCm: 20, alturaCm: 10, permiteRotacao: true },
    ];
    const { posicoes, estourouFolhas } = empacotar(itens, CONFIG_PADRAO);
    expect(estourouFolhas).toBe(false);
    expect(posicoes).toEqual([
      { id: "a", folha: 0, x: 0, y: 0, rotacionado: false, foraDeTamanho: false },
    ]);
  });

  it("abre uma prateleira nova quando a largura da folha estoura", () => {
    const itens: ItemEntrada[] = [
      { id: "b1", larguraCm: 30, alturaCm: 10, permiteRotacao: false },
      { id: "b2", larguraCm: 30, alturaCm: 10, permiteRotacao: false },
    ];
    const { posicoes } = empacotar(itens, CONFIG_PADRAO);
    const b1 = posicoes.find((p) => p.id === "b1")!;
    const b2 = posicoes.find((p) => p.id === "b2")!;

    expect(b1).toMatchObject({ folha: 0, x: 0, y: 0 });
    // não cabe do lado de b1 (30 + 0.5 + 30 > 56) -> vai pra prateleira de baixo
    expect(b2.folha).toBe(0);
    expect(b2.x).toBe(0);
    expect(b2.y).toBeCloseTo(10.5); // altura de b1 (10) + gutter (0.5)
  });

  it("gira 90° um item que só cabe girado", () => {
    const itens: ItemEntrada[] = [
      { id: "c", larguraCm: 100, alturaCm: 20, permiteRotacao: true },
    ];
    const { posicoes } = empacotar(itens, CONFIG_PADRAO);
    expect(posicoes[0]).toMatchObject({
      folha: 0,
      x: 0,
      y: 0,
      rotacionado: true,
      foraDeTamanho: false,
    });
  });

  it("não gira um item que não permite rotação, mesmo que só coubesse girado", () => {
    const itens: ItemEntrada[] = [
      { id: "c2", larguraCm: 100, alturaCm: 20, permiteRotacao: false },
    ];
    const { posicoes } = empacotar(itens, CONFIG_PADRAO);
    expect(posicoes[0]).toMatchObject({ folha: -1, foraDeTamanho: true });
  });

  it("respeita o gutter entre duas peças na mesma prateleira", () => {
    const itens: ItemEntrada[] = [
      { id: "d1", larguraCm: 10, alturaCm: 10, permiteRotacao: false },
      { id: "d2", larguraCm: 10, alturaCm: 10, permiteRotacao: false },
    ];
    const { posicoes } = empacotar(itens, CONFIG_PADRAO);
    const d1 = posicoes.find((p) => p.id === "d1")!;
    const d2 = posicoes.find((p) => p.id === "d2")!;
    expect(d2.x).toBeCloseTo(d1.x + 10 + CONFIG_PADRAO.gutterCm);
  });

  it("marca estourouFolhas e deixa o item sem posição quando passa do limite de folhas", () => {
    const itens: ItemEntrada[] = [
      { id: "e1", larguraCm: 10, alturaCm: 10, permiteRotacao: false },
      { id: "e2", larguraCm: 5, alturaCm: 5, permiteRotacao: false },
    ];
    const config = { larguraFolha: 10, alturaFolha: 10, gutterCm: 0, maxFolhas: 1 };
    const { posicoes, estourouFolhas } = empacotar(itens, config);

    expect(estourouFolhas).toBe(true);
    const e2 = posicoes.find((p) => p.id === "e2")!;
    expect(e2.folha).toBe(-1);
    // cabe numa folha vazia, só não tinha mais folha disponível
    expect(e2.foraDeTamanho).toBe(false);
  });

  it("marca foraDeTamanho quando o item não cabe nem sozinho, mesmo girado", () => {
    const itens: ItemEntrada[] = [
      { id: "f", larguraCm: 200, alturaCm: 200, permiteRotacao: true },
    ];
    const { posicoes, estourouFolhas } = empacotar(itens, CONFIG_PADRAO);
    expect(posicoes[0]).toMatchObject({ folha: -1, foraDeTamanho: true });
    expect(estourouFolhas).toBe(false);
  });

  it("reempacota itens livres ao redor de um item travado (posicaoFixa)", () => {
    const itens: ItemEntrada[] = [
      {
        id: "g",
        larguraCm: 20,
        alturaCm: 20,
        permiteRotacao: false,
        posicaoFixa: { folha: 0, x: 0, y: 0, rotacionado: false },
      },
      { id: "h", larguraCm: 50, alturaCm: 10, permiteRotacao: false },
    ];
    const { posicoes } = empacotar(itens, CONFIG_PADRAO);

    const g = posicoes.find((p) => p.id === "g")!;
    const h = posicoes.find((p) => p.id === "h")!;

    // o item travado não se move
    expect(g).toEqual({ id: "g", folha: 0, x: 0, y: 0, rotacionado: false, foraDeTamanho: false });

    // h (largura 50) não cabe ao lado de g na faixa y=[0,10] (sobra só 56-20.5=35.5cm),
    // então desce pra abaixo do obstáculo em vez de sobrepor
    expect(h.folha).toBe(0);
    expect(h.y).toBeGreaterThanOrEqual(20.5 - 0.01);
    // não pode se sobrepor ao retângulo do obstáculo (0,0)-(20,20) + gutter
    const overlapX = h.x < 20.5 && 0 < h.x + 50;
    const overlapY = h.y < 20.5 && 0 < h.y + 10;
    expect(overlapX && overlapY).toBe(false);
  });
});
