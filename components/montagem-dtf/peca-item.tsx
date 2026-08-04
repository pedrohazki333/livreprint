"use client";

import { Group, Image as KonvaImage, Rect, Text } from "react-konva";
import useImage from "use-image";
import type Konva from "konva";
import { FILME } from "@/lib/constants";
import { PPC_DTF } from "@/lib/montagem-dtf/store";
import type { ArteDtf, PecaDtf } from "@/lib/montagem-dtf/store";
import { CORES } from "@/lib/theme";

type Props = {
  peca: PecaDtf;
  arte: ArteDtf | undefined;
  selecionada: boolean;
  onSelecionar: () => void;
  onMover: (xCm: number, yCm: number) => void;
};

export function PecaItem({ peca, arte, selecionada, onSelecionar, onMover }: Props) {
  const [img, status] = useImage(arte?.src ?? "");

  const wCm = peca.rotacionado ? peca.alturaCm : peca.larguraCm;
  const hCm = peca.rotacionado ? peca.larguraCm : peca.alturaCm;
  const wPx = Math.max(1, wCm * PPC_DTF);
  const hPx = Math.max(1, hCm * PPC_DTF);
  const imgWPx = Math.max(1, peca.larguraCm * PPC_DTF);
  const imgHPx = Math.max(1, peca.alturaCm * PPC_DTF);

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    onMover(e.target.x() / PPC_DTF, e.target.y() / PPC_DTF);
  };

  const dragBound = (pos: { x: number; y: number }) => ({
    x: Math.min(Math.max(0, pos.x), FILME.LARGURA_UTIL_CM * PPC_DTF - wPx),
    y: Math.min(Math.max(0, pos.y), FILME.ALTURA_CHAPA_CM * PPC_DTF - hPx),
  });

  return (
    <Group
      x={peca.x * PPC_DTF}
      y={peca.y * PPC_DTF}
      draggable
      dragBoundFunc={dragBound}
      onClick={onSelecionar}
      onTap={onSelecionar}
      onDragStart={onSelecionar}
      onDragEnd={handleDragEnd}
    >
      <Group rotation={peca.rotacionado ? 90 : 0} x={peca.rotacionado ? wPx : 0}>
        <Group
          scaleX={peca.espelhada ? -1 : 1}
          x={peca.espelhada ? imgWPx : 0}
        >
          {status === "loaded" && img ? (
            <KonvaImage image={img} width={imgWPx} height={imgHPx} />
          ) : (
            <>
              <Rect width={imgWPx} height={imgHPx} fill="rgba(255,255,255,0.85)" stroke={CORES.primario} strokeWidth={1} />
              <Text
                width={imgWPx}
                height={imgHPx}
                align="center"
                verticalAlign="middle"
                text={status === "loading" ? "…" : "arquivo"}
                fontSize={10}
                fill={CORES.primario}
              />
            </>
          )}
        </Group>
      </Group>
      <Rect
        width={wPx}
        height={hPx}
        stroke={selecionada ? CORES.primario : "rgba(20,20,15,0.25)"}
        strokeWidth={selecionada ? 2 : 1}
        dash={peca.travada ? undefined : peca.manual ? [4, 3] : undefined}
        listening={false}
      />
      {peca.travada && (
        <Text text="🔒" x={wPx - 16} y={2} fontSize={12} listening={false} />
      )}
    </Group>
  );
}
