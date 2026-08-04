"use client";

import { useRouter } from "next/navigation";
import { FACES } from "@/lib/configurador/faces";
import { useConfiguradorStore } from "@/lib/configurador/store";
import { calcularDpi } from "@/lib/dpi";
import { brl } from "@/lib/format";

export function PainelLateral() {
  const router = useRouter();
  const slug = useConfiguradorStore((s) => s.slug);
  const faceAtiva = useConfiguradorStore((s) => s.faceAtiva);
  const arts = useConfiguradorStore((s) => s.arts);
  const selecionadoId = useConfiguradorStore((s) => s.selecionadoId);
  const atualizarArte = useConfiguradorStore((s) => s.atualizarArte);
  const removerArte = useConfiguradorStore((s) => s.removerArte);
  const moverCamada = useConfiguradorStore((s) => s.moverCamada);
  const produtoNome = useConfiguradorStore((s) => s.produtoNome);
  const cor = useConfiguradorStore((s) => s.cor);
  const tecido = useConfiguradorStore((s) => s.tecido);
  const tamanhos = useConfiguradorStore((s) => s.tamanhos);
  const precoTotalCentavos = useConfiguradorStore((s) => s.precoTotalCentavos);

  const artsFace = arts[faceAtiva] ?? [];
  const sel = artsFace.find((a) => a.id === selecionadoId) ?? null;

  const facesComArte = FACES.filter((f) => (arts[f.nome]?.length ?? 0) > 0);
  const temAlgumaArte = facesComArte.length > 0;

  const totalQty = tamanhos.reduce((s, t) => s + t.qtd, 0);
  const qtyLabel =
    tamanhos.filter((t) => t.qtd > 0).length > 0
      ? tamanhos
          .filter((t) => t.qtd > 0)
          .map((t) => `${t.tamanho}: ${t.qtd}`)
          .join(" · ")
      : "—";

  let dpiTexto = "";
  let dpiCor = "text-muted-foreground";
  if (sel) {
    const dpi = calcularDpi(sel.natW, sel.w);
    if (dpi >= 300) {
      dpiTexto = `Resolução ótima: ${dpi} DPI no tamanho atual.`;
      dpiCor = "text-primary";
    } else if (dpi >= 150) {
      dpiTexto = `Resolução aceitável: ${dpi} DPI. Reduzir o tamanho melhora o resultado.`;
      dpiCor = "text-warning";
    } else {
      dpiTexto = `Resolução baixa: ${dpi} DPI. A estampa pode sair borrada nesse tamanho.`;
      dpiCor = "text-danger";
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3.5 text-sm font-bold text-foreground">
          Arte selecionada
        </div>
        {sel ? (
          <div className="flex flex-col gap-3.5">
            <div className="flex gap-3">
              <label className="flex-1">
                <div className="mb-1.5 text-[11px] tracking-wide text-muted-2">
                  LARGURA (CM)
                </div>
                <input
                  type="number"
                  min={1}
                  value={Math.round(sel.w * 10) / 10}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    if (v > 0)
                      atualizarArte(sel.id, {
                        w: v,
                        h: v / (sel.w / sel.h),
                      });
                  }}
                  className="w-full rounded-lg border border-border px-2.5 py-2 text-sm"
                />
              </label>
              <label className="flex-1">
                <div className="mb-1.5 text-[11px] tracking-wide text-muted-2">
                  ALTURA (CM)
                </div>
                <input
                  type="number"
                  min={1}
                  value={Math.round(sel.h * 10) / 10}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    if (v > 0)
                      atualizarArte(sel.id, {
                        h: v,
                        w: v * (sel.w / sel.h),
                      });
                  }}
                  className="w-full rounded-lg border border-border px-2.5 py-2 text-sm"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  atualizarArte(sel.id, {
                    rot: ((sel.rot + 90) % 360) as 0 | 90 | 180 | 270,
                  })
                }
                className="flex-1 rounded-lg border border-secondary-foreground/20 bg-secondary px-2 py-2.5 text-xs font-bold text-secondary-foreground"
              >
                Rotacionar 90°
              </button>
              <button
                type="button"
                onClick={() => {
                  const face = FACES.find((f) => f.nome === faceAtiva);
                  if (face) atualizarArte(sel.id, { x: (face.larguraCm - sel.w) / 2 });
                }}
                className="flex-1 rounded-lg border border-secondary-foreground/20 bg-secondary px-2 py-2.5 text-xs font-bold text-secondary-foreground"
              >
                Centralizar ↔
              </button>
              <button
                type="button"
                onClick={() => {
                  const face = FACES.find((f) => f.nome === faceAtiva);
                  if (face) atualizarArte(sel.id, { y: (face.alturaCm - sel.h) / 2 });
                }}
                className="flex-1 rounded-lg border border-secondary-foreground/20 bg-secondary px-2 py-2.5 text-xs font-bold text-secondary-foreground"
              >
                Centralizar ↕
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => moverCamada(sel.id, "frente")}
                className="flex-1 rounded-lg border border-border px-2 py-2.5 text-xs font-bold text-foreground"
              >
                Trazer à frente
              </button>
              <button
                type="button"
                onClick={() => moverCamada(sel.id, "tras")}
                className="flex-1 rounded-lg border border-border px-2 py-2.5 text-xs font-bold text-foreground"
              >
                Enviar pra trás
              </button>
            </div>

            <button
              type="button"
              onClick={() => removerArte(sel.id)}
              className="text-center text-xs font-bold text-danger"
            >
              Remover arte
            </button>

            <div className={`rounded-lg bg-muted px-2.5 py-2.5 text-xs ${dpiCor}`}>
              {dpiTexto}
            </div>
          </div>
        ) : (
          <div className="text-[13px] leading-relaxed text-muted-2">
            Envie uma arte e clique nela no mockup pra ajustar tamanho,
            rotação e posição.
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3.5 text-sm font-bold text-foreground">
          Seu pedido
        </div>
        <div className="flex flex-col gap-2.5 text-[13px] text-muted-foreground">
          <div className="flex justify-between">
            <span>Peça</span>
            <b className="text-foreground">{produtoNome}</b>
          </div>
          <div className="flex justify-between">
            <span>Cor</span>
            <b className="text-foreground">{cor}</b>
          </div>
          <div className="flex justify-between">
            <span>Tecido</span>
            <b className="text-foreground">{tecido}</b>
          </div>
          <div className="flex justify-between">
            <span>Quantidade</span>
            <b className="text-foreground">{qtyLabel}</b>
          </div>
          <div className="flex justify-between gap-3">
            <span>Faces estampadas</span>
            <b className="text-right text-foreground">
              {facesComArte.length
                ? facesComArte.map((f) => f.label).join(", ")
                : "nenhuma ainda"}
            </b>
          </div>
        </div>
        <div className="my-4 border-t border-border" />
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] text-muted-foreground">
            Total estimado · {Math.max(totalQty, 1)} peça(s)
          </span>
          <span className="font-heading text-2xl text-primary">
            {brl(precoTotalCentavos)}
          </span>
        </div>
        <button
          type="button"
          disabled={!temAlgumaArte}
          onClick={() => router.push(`/personalizar/${slug}/revisao`)}
          className="mt-4 w-full rounded-xl bg-primary py-4 text-[15px] font-bold text-primary-foreground disabled:cursor-not-allowed disabled:bg-muted-2"
        >
          Ir para revisão
        </button>
        {!temAlgumaArte && (
          <div className="mt-2 text-center text-xs text-muted-2">
            Adicione ao menos uma arte pra continuar.
          </div>
        )}
      </div>
    </div>
  );
}
