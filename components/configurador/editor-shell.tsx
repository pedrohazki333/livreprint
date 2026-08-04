"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { EditorHeader } from "./editor-header";
import { AbasFace } from "./abas-face";
import { UploadArte } from "./upload-arte";
import { PainelLateral } from "./painel-lateral";
import { FACES, mockupEmPreparacao } from "@/lib/configurador/faces";
import { useConfiguradorStore } from "@/lib/configurador/store";
import { useHydrateConfigurador } from "@/lib/configurador/use-hydrate";

const Palco = dynamic(() => import("./palco").then((m) => m.Palco), {
  ssr: false,
});

type Tamanho = { tamanho: string; qtd: number };

type EditorShellProps = {
  slug: string;
  produtoNome: string;
  cor: string;
  corHex: string;
  tecido: string;
  tamanhos: Tamanho[];
  precoUnitarioCentavos: number;
  precoTotalCentavos: number;
};

export function EditorShell(props: EditorShellProps) {
  const hidratado = useHydrateConfigurador();
  const iniciar = useConfiguradorStore((s) => s.iniciar);
  const faceAtiva = useConfiguradorStore((s) => s.faceAtiva);

  useEffect(() => {
    if (!hidratado) return;
    iniciar(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidratado, props.slug]);

  const face = FACES.find((f) => f.nome === faceAtiva) ?? FACES[0];

  if (!hidratado) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Carregando editor…
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <EditorHeader passoAtivo={1} voltarHref={`/produto/${props.slug}`} />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[1fr_360px]">
        <div>
          <AbasFace />
          {mockupEmPreparacao(props.slug) && (
            <div className="mb-3 rounded-lg border border-warning-border bg-warning-bg px-3.5 py-2 text-center text-xs text-warning">
              Mockup de {props.produtoNome} em preparação — as medidas já
              são as reais desta peça.
            </div>
          )}
          <Palco face={face} corHex={props.corHex} />
          <UploadArte faceLabel={face.label} />
          <div className="mt-2 text-center text-xs text-muted-2">
            PNG, PDF ou SVG · fundo transparente recomendado
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <PainelLateral />
        </div>
      </div>
    </div>
  );
}
