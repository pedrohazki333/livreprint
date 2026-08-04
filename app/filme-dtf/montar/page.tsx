"use client";

import dynamic from "next/dynamic";
import { AbasFolha } from "@/components/montagem-dtf/abas-folha";
import { EditorHeader } from "@/components/configurador/editor-header";
import { PainelLateralDtf } from "@/components/montagem-dtf/painel-lateral-dtf";
import { UploadArtesDtf } from "@/components/montagem-dtf/upload-artes-dtf";
import { useHydrateMontagemDtf } from "@/lib/montagem-dtf/use-hydrate";

const PalcoDtf = dynamic(
  () => import("@/components/montagem-dtf/palco-dtf").then((m) => m.PalcoDtf),
  { ssr: false },
);

export default function MontarDtfPage() {
  const hidratado = useHydrateMontagemDtf();

  if (!hidratado) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Carregando editor…
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <EditorHeader
        passoAtivo={1}
        voltarHref="/filme-dtf"
        voltarLabel="← Voltar"
        passos={["Montar folha", "Revisão", "Checkout"]}
      />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[1fr_380px]">
        <div>
          <AbasFolha />
          <PalcoDtf />
          <div className="mt-4">
            <UploadArtesDtf />
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <PainelLateralDtf />
        </div>
      </div>
    </div>
  );
}
