"use client";

import { Group, Image as KonvaImage, Rect, Text } from "react-konva";
import useImage from "use-image";
import type Konva from "konva";
import { PPC } from "@/lib/configurador/faces";
import type { Arte } from "@/lib/configurador/store";
import { CORES } from "@/lib/theme";

type Props = {
  arte: Arte;
  offsetX: number;
  offsetY: number;
  selecionado: boolean;
  onSelecionar: () => void;
  onMudar: (patch: Partial<Omit<Arte, "id">>) => void;
};

export function ArteItem({
  arte,
  offsetX,
  offsetY,
  selecionado,
  onSelecionar,
  onMudar,
}: Props) {
  const [img, status] = useImage(arte.src);

  const wPx = Math.max(1, arte.w * PPC);
  const hPx = Math.max(1, arte.h * PPC);
  const cx = offsetX + arte.x * PPC + wPx / 2;
  const cy = offsetY + arte.y * PPC + hPx / 2;

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    onMudar({
      x: (e.target.x() - wPx / 2 - offsetX) / PPC,
      y: (e.target.y() - hPx / 2 - offsetY) / PPC,
    });
  };

  const handleResizeDrag = (e: Konva.KonvaEventObject<DragEvent>) => {
    const ratio = arte.w / arte.h;
    const novaWPx = Math.max(PPC, e.target.x() + 7);
    const novaHPx = novaWPx / ratio;
    e.target.position({ x: novaWPx - 7, y: novaHPx - 7 });
    onMudar({ w: novaWPx / PPC, h: novaHPx / PPC });
  };

  return (
    <Group
      x={cx}
      y={cy}
      offsetX={wPx / 2}
      offsetY={hPx / 2}
      rotation={arte.rot}
      draggable
      onClick={onSelecionar}
      onTap={onSelecionar}
      onDragStart={onSelecionar}
      onDragEnd={handleDragEnd}
    >
      {status === "loaded" && img ? (
        <KonvaImage image={img} width={wPx} height={hPx} />
      ) : (
        <>
          <Rect
            width={wPx}
            height={hPx}
            fill="rgba(255,255,255,0.85)"
            stroke={CORES.primario}
            strokeWidth={1}
          />
          <Text
            width={wPx}
            height={hPx}
            align="center"
            verticalAlign="middle"
            text={status === "loading" ? "carregando…" : "arquivo"}
            fontSize={11}
            fill={CORES.primario}
          />
        </>
      )}
      {selecionado && (
        <>
          <Rect
            width={wPx}
            height={hPx}
            stroke={CORES.primario}
            strokeWidth={2}
            listening={false}
          />
          <Rect
            x={wPx - 7}
            y={hPx - 7}
            width={14}
            height={14}
            fill={CORES.primario}
            cornerRadius={7}
            draggable
            onDragMove={handleResizeDrag}
          />
        </>
      )}
    </Group>
  );
}
