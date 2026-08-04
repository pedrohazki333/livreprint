"use client";

import type { ChangeEvent } from "react";
import { ARTE } from "@/lib/constants";
import { useConfiguradorStore } from "@/lib/configurador/store";

const MIME_POR_FORMATO: Record<string, string> = {
  png: "image/png",
  svg: "image/svg+xml",
  pdf: "application/pdf",
};

const ACCEPT = ARTE.FORMATOS_ACEITOS.map((f) => MIME_POR_FORMATO[f]).join(",");

export function UploadArte({ faceLabel }: { faceLabel: string }) {
  const faceAtiva = useConfiguradorStore((s) => s.faceAtiva);
  const adicionarArte = useConfiguradorStore((s) => s.adicionarArte);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (file.size > ARTE.TAMANHO_MAX_MB * 1024 * 1024) {
      window.alert(`Arquivo maior que ${ARTE.TAMANHO_MAX_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      const img = new Image();
      img.onload = () =>
        adicionarArte(faceAtiva, {
          src,
          natW: img.naturalWidth,
          natH: img.naturalHeight,
        });
      img.onerror = () => adicionarArte(faceAtiva, { src, natW: 1000, natH: 1000 });
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  return (
    <label className="mt-4 flex cursor-pointer items-center justify-center gap-2.5 rounded-[10px] bg-primary px-6 py-3.5 text-[15px] font-bold text-primary-foreground">
      Enviar arte para {faceLabel.toLowerCase()}
      <input
        type="file"
        accept={ACCEPT}
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}
