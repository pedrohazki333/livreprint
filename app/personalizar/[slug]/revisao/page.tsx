"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditorHeader } from "@/components/configurador/editor-header";
import { FaceCardRevisao } from "@/components/configurador/face-card-revisao";
import { FACES } from "@/lib/configurador/faces";
import { useConfiguradorStore } from "@/lib/configurador/store";
import { useHydrateConfigurador } from "@/lib/configurador/use-hydrate";
import { useCarrinhoStore } from "@/lib/carrinho/store";
import { useHydrateCarrinho } from "@/lib/carrinho/use-hydrate";
import { brl } from "@/lib/format";

export default function RevisaoPecaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const hidratadoConfigurador = useHydrateConfigurador();
  const hidratadoCarrinho = useHydrateCarrinho();

  const arts = useConfiguradorStore((s) => s.arts);
  const produtoNome = useConfiguradorStore((s) => s.produtoNome);
  const cor = useConfiguradorStore((s) => s.cor);
  const corHex = useConfiguradorStore((s) => s.corHex);
  const tecido = useConfiguradorStore((s) => s.tecido);
  const tamanhos = useConfiguradorStore((s) => s.tamanhos);
  const precoTotalCentavos = useConfiguradorStore((s) => s.precoTotalCentavos);
  const limpar = useConfiguradorStore((s) => s.limpar);
  const adicionarItem = useCarrinhoStore((s) => s.adicionarItem);
  const carrinho = useCarrinhoStore((s) => s.itens);

  if (!hidratadoConfigurador || !hidratadoCarrinho) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Carregando…
      </div>
    );
  }

  const facesComArte = FACES.filter((f) => (arts[f.nome]?.length ?? 0) > 0);
  const temPedido = facesComArte.length > 0 && !!produtoNome;

  const totalQty = tamanhos.reduce((s, t) => s + t.qtd, 0);
  const qtyLabel =
    tamanhos.filter((t) => t.qtd > 0).length > 0
      ? tamanhos
          .filter((t) => t.qtd > 0)
          .map((t) => `${t.tamanho}: ${t.qtd}`)
          .join(" · ")
      : "—";

  const todasArtes = facesComArte.flatMap((f) =>
    (arts[f.nome] ?? []).map((a) => ({ face: f, arte: a })),
  );

  const irParaCheckout = () => router.push("/checkout");

  const adicionarOutraPeca = () => {
    if (!temPedido || !produtoNome || !corHex) return;
    adicionarItem({
      tipo: "peca_personalizada",
      produtoNome,
      cor: cor ?? "",
      qtyLabel,
      totalQty: Math.max(totalQty, 1),
      precoTotalCentavos,
    });
    limpar();
    router.push("/catalogo");
  };

  return (
    <div className="flex min-h-full flex-col">
      <EditorHeader passoAtivo={2} voltarHref={`/personalizar/${slug}`} voltarLabel="← Editar arte" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 px-6 py-6 lg:grid-cols-[1fr_400px]">
        <div>
          <h1 className="mb-2 font-heading text-[26px] text-foreground md:text-[32px]">
            Confira sua peça
          </h1>
          <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            A área tracejada é a região de impressão em cada face. É
            exatamente assim que a arte vai ser prensada.
          </p>

          {temPedido ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {facesComArte.map((f) => (
                  <FaceCardRevisao
                    key={f.nome}
                    face={f}
                    corHex={corHex ?? "#FFFFFF"}
                    arts={arts[f.nome] ?? []}
                  />
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-card p-5">
                <div className="mb-4 text-sm font-bold text-foreground">
                  Artes deste pedido
                </div>
                <div className="flex flex-col gap-3">
                  {todasArtes.map(({ face, arte }) => {
                    const dpi = Math.round(arte.natW / (arte.w / 2.54));
                    const dpiCor =
                      dpi >= 300
                        ? "text-primary"
                        : dpi >= 150
                          ? "text-warning"
                          : "text-danger";
                    return (
                      <div
                        key={arte.id}
                        className="flex items-center gap-3.5 border-b border-border pb-3 last:border-0 last:pb-0"
                      >
                        <div className="h-12 w-12 flex-none overflow-hidden rounded-lg border border-border bg-background">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={arte.src}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold text-foreground">
                            {face.label}
                          </div>
                          <div className="text-[13px] text-muted-foreground">
                            {Math.round(arte.w * 10) / 10} ×{" "}
                            {Math.round(arte.h * 10) / 10} cm
                            {arte.rot ? ` · ${arte.rot}°` : ""}
                          </div>
                        </div>
                        <div className={`text-[13px] font-bold whitespace-nowrap ${dpiCor}`}>
                          {dpi} DPI
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-secondary-foreground/20 bg-secondary p-5">
                <div className="mb-2.5 text-sm font-bold text-secondary-foreground">
                  Antes de confirmar
                </div>
                <div className="flex flex-col gap-2 text-sm text-foreground/80">
                  <div>· Conferimos resolução e posição de cada arte antes de prensar.</div>
                  <div>· Peça lavada do avesso, sem alvejante — a estampa dura muito mais.</div>
                  <div>· Se algo estiver arriscado, a gente te chama antes de produzir.</div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-7 text-center">
              <div className="mb-2 text-base font-bold text-foreground">
                Nenhuma personalização encontrada
              </div>
              <div className="mb-5 text-sm leading-relaxed text-muted-foreground">
                Escolha uma peça no catálogo e monte sua arte pra ver a
                revisão aqui.
              </div>
              <Link
                href="/catalogo"
                className="inline-block rounded-lg bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground"
              >
                Ver catálogo
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3.5 text-sm font-bold text-foreground">
              Resumo do pedido
            </div>
            <div className="flex flex-col gap-2.5 text-[13px] text-muted-foreground">
              <div className="flex justify-between gap-3">
                <span>Peça</span>
                <b className="text-foreground">{produtoNome ?? "—"}</b>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Cor</span>
                <div className="flex items-center gap-2">
                  {corHex && (
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-border"
                      style={{ background: corHex }}
                    />
                  )}
                  <b className="text-foreground">{cor ?? "—"}</b>
                </div>
              </div>
              <div className="flex justify-between gap-3">
                <span>Tecido</span>
                <b className="text-right text-foreground">{tecido ?? "—"}</b>
              </div>
              <div className="flex justify-between gap-3">
                <span>Tamanhos</span>
                <b className="text-right text-foreground">{qtyLabel}</b>
              </div>
              <div className="flex justify-between gap-3">
                <span>Faces estampadas</span>
                <b className="text-right text-foreground">
                  {facesComArte.length
                    ? facesComArte.map((f) => f.label).join(", ")
                    : "—"}
                </b>
              </div>
            </div>
            <div className="my-4 border-t border-border" />
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] text-muted-foreground">
                Total · {Math.max(totalQty, 1)} peça(s)
              </span>
              <span className="font-heading text-[26px] text-primary">
                {brl(precoTotalCentavos)}
              </span>
            </div>
            <div className="mt-1.5 text-xs text-muted-2">
              Frete calculado no checkout.
            </div>

            <button
              type="button"
              disabled={!temPedido}
              onClick={irParaCheckout}
              className="mt-4 w-full rounded-xl bg-primary py-4 text-[15px] font-bold text-primary-foreground disabled:cursor-not-allowed disabled:bg-muted-2"
            >
              Ir para o checkout
            </button>
            <button
              type="button"
              disabled={!temPedido}
              onClick={adicionarOutraPeca}
              className="mt-2.5 w-full rounded-xl border-2 border-foreground py-4 text-[15px] font-bold text-foreground disabled:cursor-not-allowed disabled:border-muted-2 disabled:text-muted-2"
            >
              Adicionar ao carrinho e personalizar outra peça
            </button>
            <Link
              href={`/personalizar/${slug}`}
              className="mt-3.5 block text-center text-[13px] font-bold text-secondary-foreground"
            >
              Voltar e ajustar a arte
            </Link>
          </div>

          {carrinho.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 text-sm font-bold text-foreground">
                No carrinho
              </div>
              <div className="flex flex-col gap-2.5">
                {carrinho.map((c) => (
                  <div
                    key={c.id}
                    className="flex justify-between gap-3 text-[13px] text-muted-foreground"
                  >
                    <span>
                      {c.produtoNome} · {c.cor} · {c.totalQty} peça(s)
                    </span>
                    <b className="whitespace-nowrap text-foreground">
                      {brl(c.precoTotalCentavos)}
                    </b>
                  </div>
                ))}
              </div>
              <div className="my-3.5 border-t border-border" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal do carrinho</span>
                <b className="text-primary">
                  {brl(carrinho.reduce((s, c) => s + c.precoTotalCentavos, 0) + precoTotalCentavos)}
                </b>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
