import { FILME } from "@/lib/constants";
import { precoDtf } from "@/lib/pricing/dtf";
import type { PecaDtf } from "./store";

export type ResumoFolha = {
  folha: number;
  pecas: PecaDtf[];
  usadoCm: number;
  cobradoCm: number;
  totalCentavos: number;
};

export type ResumoMontagem = {
  porFolha: ResumoFolha[];
  totalPecas: number;
  totalCobradoCm: number;
  totalCentavos: number;
  aproveitamentoPct: number;
};

/** Resumo por folha e total, calculando o preço de cada folha via `precoDtf`. */
export function calcularResumo(pecas: PecaDtf[]): ResumoMontagem {
  const posicionadas = pecas.filter((p) => p.folha >= 0);
  const porFolhaMap = new Map<number, PecaDtf[]>();
  for (const p of posicionadas) {
    const lista = porFolhaMap.get(p.folha) ?? [];
    lista.push(p);
    porFolhaMap.set(p.folha, lista);
  }

  const porFolha: ResumoFolha[] = [...porFolhaMap.keys()]
    .sort((a, b) => a - b)
    .map((folha) => {
      const pecasFolha = porFolhaMap.get(folha)!;
      const usadoCm = pecasFolha.reduce((max, p) => {
        const h = p.rotacionado ? p.larguraCm : p.alturaCm;
        return Math.max(max, p.y + h);
      }, 0);
      const { metragemCobradaCm, totalCentavos } = precoDtf(usadoCm);
      return { folha, pecas: pecasFolha, usadoCm, cobradoCm: metragemCobradaCm, totalCentavos };
    });

  const totalCobradoCm = porFolha.reduce((s, f) => s + f.cobradoCm, 0);
  const totalCentavos = porFolha.reduce((s, f) => s + f.totalCentavos, 0);
  const areaTotal = posicionadas.reduce((s, p) => s + p.larguraCm * p.alturaCm, 0);
  const aproveitamentoPct =
    totalCobradoCm > 0
      ? Math.round((areaTotal / (FILME.LARGURA_UTIL_CM * totalCobradoCm)) * 100)
      : 0;

  return {
    porFolha,
    totalPecas: posicionadas.length,
    totalCobradoCm,
    totalCentavos,
    aproveitamentoPct,
  };
}
