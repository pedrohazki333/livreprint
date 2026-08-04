"use client";

import { FACES } from "@/lib/configurador/faces";
import { useConfiguradorStore } from "@/lib/configurador/store";

export function AbasFace() {
  const faceAtiva = useConfiguradorStore((s) => s.faceAtiva);
  const setFaceAtiva = useConfiguradorStore((s) => s.setFaceAtiva);

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {FACES.map((f) => {
        const ativa = f.nome === faceAtiva;
        return (
          <button
            key={f.nome}
            type="button"
            onClick={() => setFaceAtiva(f.nome)}
            className={`rounded-full px-4 py-2.5 text-[13px] font-bold ${
              ativa
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground"
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
