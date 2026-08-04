"use client";

import type { ChangeEvent } from "react";
import { ARTE } from "@/lib/constants";
import { useMontagemDtfStore } from "@/lib/montagem-dtf/store";

const MIME_POR_FORMATO: Record<string, string> = {
  png: "image/png",
  svg: "image/svg+xml",
  pdf: "application/pdf",
};

const ACCEPT = ARTE.FORMATOS_ACEITOS.map((f) => MIME_POR_FORMATO[f]).join(",");

export function UploadArtesDtf() {
  const adicionarArte = useMontagemDtfStore((s) => s.adicionarArte);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const arquivos = Array.from(e.target.files ?? []);
    e.target.value = "";

    for (const file of arquivos) {
      if (file.size > ARTE.TAMANHO_MAX_MB * 1024 * 1024) {
        window.alert(`"${file.name}" é maior que ${ARTE.TAMANHO_MAX_MB}MB.`);
        continue;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result as string;
        const img = new Image();
        img.onload = () => adicionarArte({ src, natW: img.naturalWidth, natH: img.naturalHeight });
        img.onerror = () => adicionarArte({ src, natW: 1000, natH: 1000 });
        img.src = src;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-secondary-foreground/30 bg-secondary px-4 py-5 text-center">
      <span className="text-sm font-bold text-secondary-foreground">Enviar artes</span>
      <span className="text-xs text-muted-2">
        PNG, PDF ou SVG · pode selecionar várias
      </span>
      <input type="file" accept={ACCEPT} multiple onChange={onChange} className="hidden" />
    </label>
  );
}
