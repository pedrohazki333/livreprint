"use client";

import { Layer, Rect, Stage } from "react-konva";
import type Konva from "konva";
import { PPC, type FaceDef } from "@/lib/configurador/faces";
import { ARTES_VAZIO, useConfiguradorStore } from "@/lib/configurador/store";
import { CORES } from "@/lib/theme";
import { ArteItem } from "./arte-item";

const PADDING = 32;

export function Palco({ face, corHex }: { face: FaceDef; corHex: string }) {
  const arts = useConfiguradorStore((s) => s.arts[face.nome] ?? ARTES_VAZIO);
  const selecionadoId = useConfiguradorStore((s) => s.selecionadoId);
  const selecionar = useConfiguradorStore((s) => s.selecionar);
  const atualizarArte = useConfiguradorStore((s) => s.atualizarArte);

  const areaW = face.larguraCm * PPC;
  const areaH = face.alturaCm * PPC;
  const stageW = areaW + PADDING * 2;
  const stageH = areaH + PADDING * 2;

  const foraDaArea = arts.some(
    (a) =>
      a.x < 0 ||
      a.y < 0 ||
      a.x + a.w > face.larguraCm + 0.01 ||
      a.y + a.h > face.alturaCm + 0.01,
  );

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) selecionar(null);
  };
  const handleTouchStart = (e: Konva.KonvaEventObject<TouchEvent>) => {
    if (e.target === e.target.getStage()) selecionar(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 text-xs tracking-wide text-muted-2">
        ÁREA SEGURA DE IMPRESSÃO · {face.label} · {face.larguraCm} x{" "}
        {face.alturaCm} cm
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card p-4">
        <Stage
          width={stageW}
          height={stageH}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <Layer>
            <Rect x={PADDING} y={PADDING} width={areaW} height={areaH} fill={corHex} />
            <Rect
              x={PADDING}
              y={PADDING}
              width={areaW}
              height={areaH}
              stroke={CORES.primario}
              dash={[6, 4]}
              strokeWidth={2}
              listening={false}
            />
            {arts.map((a) => (
              <ArteItem
                key={a.id}
                arte={a}
                offsetX={PADDING}
                offsetY={PADDING}
                selecionado={a.id === selecionadoId}
                onSelecionar={() => selecionar(a.id)}
                onMudar={(patch) => atualizarArte(a.id, patch)}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      {foraDaArea && (
        <div className="mt-3 max-w-md rounded-xl border border-danger-border bg-danger-bg px-4 py-2.5 text-center text-sm text-danger">
          Uma das artes está fora da área segura. Ajuste a posição ou o
          tamanho pra não perder parte da estampa.
        </div>
      )}
    </div>
  );
}
