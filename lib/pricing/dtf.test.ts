import { describe, expect, it } from "vitest";
import { precoDtf } from "./dtf";

describe("precoDtf", () => {
  it("cobra o mínimo de 30cm mesmo pra usos menores", () => {
    expect(precoDtf(5)).toEqual({ metragemCobradaCm: 30, totalCentavos: 2097 });
    expect(precoDtf(30)).toEqual({ metragemCobradaCm: 30, totalCentavos: 2097 });
  });

  it("arredonda pra cima em passos de 5cm", () => {
    // exemplo do CLAUDE.md: 42cm de arte -> cobra 45cm -> R$31,46
    expect(precoDtf(42)).toEqual({ metragemCobradaCm: 45, totalCentavos: 3146 });
  });

  it("não arredonda quando já é múltiplo exato de 5cm", () => {
    expect(precoDtf(50)).toEqual({ metragemCobradaCm: 50, totalCentavos: 3495 });
  });

  it("cobra o valor cheio de uma folha de 100cm (1 metro)", () => {
    expect(precoDtf(100)).toEqual({ metragemCobradaCm: 100, totalCentavos: 6990 });
  });

  it("não cobra nada pra metragem zero ou negativa", () => {
    expect(precoDtf(0)).toEqual({ metragemCobradaCm: 0, totalCentavos: 0 });
    expect(precoDtf(-10)).toEqual({ metragemCobradaCm: 0, totalCentavos: 0 });
  });
});
