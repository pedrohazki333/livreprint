import type { Arte } from "@/lib/configurador/store";
import type { FaceDef } from "@/lib/configurador/faces";

const BOX_W = 220;

export function FaceCardRevisao({
  face,
  corHex,
  arts,
}: {
  face: FaceDef;
  corHex: string;
  arts: Arte[];
}) {
  const boxH = (BOX_W * face.alturaCm) / face.larguraCm;

  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-card p-4">
      <div className="text-xs tracking-wide text-muted-2">
        {face.label.toUpperCase()}
      </div>
      <div
        className="relative mx-auto overflow-hidden rounded-md border-2 border-dashed border-primary"
        style={{ width: BOX_W, height: boxH, background: corHex }}
      >
        {arts.map((a) => (
          // eslint-disable-next-line @next/next/no-img-element -- miniatura de data URL local, sem otimização remota a ganhar
          <img
            key={a.id}
            src={a.src}
            alt=""
            className="absolute object-contain"
            style={{
              left: `${(a.x / face.larguraCm) * 100}%`,
              top: `${(a.y / face.alturaCm) * 100}%`,
              width: `${(a.w / face.larguraCm) * 100}%`,
              height: `${(a.h / face.alturaCm) * 100}%`,
              transform: `rotate(${a.rot}deg)`,
              transformOrigin: "center",
            }}
          />
        ))}
      </div>
      <div className="text-xs text-muted-foreground">
        {arts.length} arte(s) · área {face.larguraCm}×{face.alturaCm} cm
      </div>
    </div>
  );
}
