"use client";

import { useMontagemDtfStore } from "@/lib/montagem-dtf/store";

export function AbasFolha() {
  const pecas = useMontagemDtfStore((s) => s.pecas);
  const folhaAtiva = useMontagemDtfStore((s) => s.folhaAtiva);
  const setFolhaAtiva = useMontagemDtfStore((s) => s.setFolhaAtiva);

  const maiorFolha = pecas.reduce((m, p) => Math.max(m, p.folha), -1);
  const totalFolhas = Math.max(1, maiorFolha + 1);

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {Array.from({ length: totalFolhas }, (_, i) => i).map((i) => {
        const ativa = i === folhaAtiva;
        return (
          <button
            key={i}
            type="button"
            onClick={() => setFolhaAtiva(i)}
            className={`rounded-full px-4 py-2.5 text-[13px] font-bold ${
              ativa
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground"
            }`}
          >
            Folha {i + 1}
          </button>
        );
      })}
    </div>
  );
}
