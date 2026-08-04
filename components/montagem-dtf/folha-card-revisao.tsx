import { FILME } from "@/lib/constants";
import type { ArteDtf, PecaDtf } from "@/lib/montagem-dtf/store";

const BOX_W = 220;
const PPCM = BOX_W / FILME.LARGURA_UTIL_CM;
const BOX_H = FILME.ALTURA_CHAPA_CM * PPCM;

export function FolhaCardRevisao({
  folha,
  pecas,
  arts,
  cobradoCm,
}: {
  folha: number;
  pecas: PecaDtf[];
  arts: ArteDtf[];
  cobradoCm: number;
}) {
  const artsPorId = new Map(arts.map((a) => [a.id, a]));
  const cortePx = cobradoCm * PPCM;
  const temCorte = cobradoCm < FILME.ALTURA_CHAPA_CM;

  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-card p-4">
      <div className="text-xs tracking-wide text-muted-2">
        FOLHA {folha + 1} · {cobradoCm} CM
      </div>
      <div
        className="relative mx-auto overflow-hidden rounded-md border-2 border-foreground"
        style={{
          width: BOX_W,
          height: BOX_H,
          background:
            "repeating-linear-gradient(45deg,#fcfaf6,#fcfaf6 8px,#f6f2ea 8px,#f6f2ea 16px)",
        }}
      >
        {pecas.map((p) => {
          const arte = artsPorId.get(p.artId);
          const wCm = p.rotacionado ? p.alturaCm : p.larguraCm;
          const hCm = p.rotacionado ? p.larguraCm : p.alturaCm;
          return (
            <div
              key={p.id}
              className="absolute overflow-hidden"
              style={{ left: p.x * PPCM, top: p.y * PPCM, width: wCm * PPCM, height: hCm * PPCM }}
            >
              {arte && (
                // eslint-disable-next-line @next/next/no-img-element -- miniatura de data URL local
                <img
                  src={arte.src}
                  alt=""
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: p.larguraCm * PPCM,
                    height: p.alturaCm * PPCM,
                    transform: `translate(-50%, -50%) rotate(${p.rotacionado ? 90 : 0}deg) scaleX(${p.espelhada ? -1 : 1})`,
                  }}
                />
              )}
            </div>
          );
        })}
        {temCorte && (
          <>
            <div
              className="absolute inset-x-0 border-t-2 border-dashed border-danger"
              style={{ top: cortePx }}
            />
            <div
              className="absolute inset-x-0 bottom-0 bg-foreground/5"
              style={{ top: cortePx }}
            />
          </>
        )}
      </div>
      <div className="text-xs text-muted-foreground">
        {pecas.length} arte(s) · corte em {cobradoCm} cm
      </div>
    </div>
  );
}
