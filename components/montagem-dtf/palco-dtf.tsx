"use client";

import { Layer, Rect, Stage } from "react-konva";
import type Konva from "konva";
import { FILME } from "@/lib/constants";
import { PPC_DTF, useMontagemDtfStore } from "@/lib/montagem-dtf/store";
import { calcularResumo } from "@/lib/montagem-dtf/resumo";
import { CORES } from "@/lib/theme";
import { PecaItem } from "./peca-item";

export function PalcoDtf() {
  const arts = useMontagemDtfStore((s) => s.arts);
  const pecas = useMontagemDtfStore((s) => s.pecas);
  const folhaAtiva = useMontagemDtfStore((s) => s.folhaAtiva);
  const selecionadoId = useMontagemDtfStore((s) => s.selecionadoId);
  const selecionar = useMontagemDtfStore((s) => s.selecionar);
  const atualizarPosicaoPeca = useMontagemDtfStore((s) => s.atualizarPosicaoPeca);

  const pecasFolha = pecas.filter((p) => p.folha === folhaAtiva);
  const artsPorId = new Map(arts.map((a) => [a.id, a]));

  const sheetW = FILME.LARGURA_UTIL_CM * PPC_DTF;
  const sheetH = FILME.ALTURA_CHAPA_CM * PPC_DTF;

  const resumo = calcularResumo(pecas);
  const resumoFolha = resumo.porFolha.find((f) => f.folha === folhaAtiva);
  const cortePx = resumoFolha ? resumoFolha.cobradoCm * PPC_DTF : 0;

  const handleDeselect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (e.target === e.target.getStage()) selecionar(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 text-xs tracking-wide text-muted-2">
        FOLHA DE DTF · {FILME.LARGURA_UTIL_CM} × {FILME.ALTURA_CHAPA_CM} CM
        {resumoFolha ? ` · usando ${resumoFolha.cobradoCm} cm` : " · folha vazia"}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card p-4">
        <Stage width={sheetW} height={sheetH} onMouseDown={handleDeselect} onTouchStart={handleDeselect}>
          <Layer>
            <Rect width={sheetW} height={sheetH} fill={CORES.folha} />
            <Rect width={sheetW} height={sheetH} stroke={CORES.tinta} strokeWidth={2} listening={false} />
            {resumoFolha && resumoFolha.cobradoCm < FILME.ALTURA_CHAPA_CM && (
              <Rect
                y={cortePx}
                width={sheetW}
                height={2}
                fill={CORES.perigo}
                listening={false}
              />
            )}
            {pecasFolha.map((p) => (
              <PecaItem
                key={p.id}
                peca={p}
                arte={artsPorId.get(p.artId)}
                selecionada={p.id === selecionadoId}
                onSelecionar={() => selecionar(p.id)}
                onMover={(x, y) => atualizarPosicaoPeca(p.id, { x, y })}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
