import { describe, expect, it } from "vitest";
import { precoTotalPeca, precoUnitarioPeca } from "./peca";

describe("precoUnitarioPeca", () => {
  it.each([
    [1, 5990],
    [9, 5990],
    [10, 4990],
    [19, 4990],
    [20, 3990],
    [29, 3990],
    [30, 3690],
    [99, 3690],
    [100, 2990],
    [250, 2990],
  ])("quantidade %i -> %i centavos", (quantidade, esperado) => {
    expect(precoUnitarioPeca(quantidade)).toBe(esperado);
  });

  it("rejeita quantidade menor que 1", () => {
    expect(() => precoUnitarioPeca(0)).toThrow(RangeError);
  });

  it("rejeita quantidade não inteira", () => {
    expect(() => precoUnitarioPeca(1.5)).toThrow(RangeError);
  });

  it("aceita uma tabela customizada", () => {
    const tabela = [{ min: 1, max: null, precoCentavos: 1234 }];
    expect(precoUnitarioPeca(500, tabela)).toBe(1234);
  });
});

describe("precoTotalPeca", () => {
  it("multiplica o preço unitário pela quantidade", () => {
    expect(precoTotalPeca(10)).toBe(4990 * 10);
    expect(precoTotalPeca(1)).toBe(5990);
  });
});
