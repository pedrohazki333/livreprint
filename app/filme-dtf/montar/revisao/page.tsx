"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditorHeader } from "@/components/configurador/editor-header";
import { FolhaCardRevisao } from "@/components/montagem-dtf/folha-card-revisao";
import { descricaoItemCarrinho } from "@/lib/carrinho/label";
import { useCarrinhoStore } from "@/lib/carrinho/store";
import { useHydrateCarrinho } from "@/lib/carrinho/use-hydrate";
import { calcularDpi, faixaDpi } from "@/lib/dpi";
import { brl } from "@/lib/format";
import { calcularResumo } from "@/lib/montagem-dtf/resumo";
import { useMontagemDtfStore } from "@/lib/montagem-dtf/store";
import { useHydrateMontagemDtf } from "@/lib/montagem-dtf/use-hydrate";

const COR_FAIXA: Record<string, string> = {
  otima: "text-primary",
  aceitavel: "text-warning",
  baixa: "text-danger",
};

export default function RevisaoDtfPage() {
  const router = useRouter();

  const hidratadoMontagem = useHydrateMontagemDtf();
  const hidratadoCarrinho = useHydrateCarrinho();

  const arts = useMontagemDtfStore((s) => s.arts);
  const pecas = useMontagemDtfStore((s) => s.pecas);
  const limparTudo = useMontagemDtfStore((s) => s.limparTudo);
  const adicionarItem = useCarrinhoStore((s) => s.adicionarItem);
  const carrinho = useCarrinhoStore((s) => s.itens);

  if (!hidratadoMontagem || !hidratadoCarrinho) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Carregando…
      </div>
    );
  }

  const resumo = calcularResumo(pecas);
  const temPedido = resumo.totalPecas > 0;

  const irParaCheckout = () => router.push("/checkout");

  const adicionarOutraFolha = () => {
    if (!temPedido) return;
    adicionarItem({
      tipo: "filme_dtf",
      folhas: resumo.porFolha.length,
      metragemCobradaCm: resumo.totalCobradoCm,
      precoTotalCentavos: resumo.totalCentavos,
    });
    limparTudo();
    router.push("/filme-dtf/montar");
  };

  return (
    <div className="flex min-h-full flex-col">
      <EditorHeader
        passoAtivo={2}
        voltarHref="/filme-dtf/montar"
        voltarLabel="← Editar montagem"
        passos={["Montar folha", "Revisão", "Checkout"]}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 px-6 py-6 lg:grid-cols-[1fr_400px]">
        <div>
          <h1 className="mb-2 font-heading text-[26px] text-foreground md:text-[32px]">
            Confira antes de imprimir
          </h1>
          <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            É assim que sua folha vai sair da impressora. A linha vermelha é
            onde cortamos — você só paga até ali.
          </p>

          {temPedido ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {resumo.porFolha.map((f) => (
                  <FolhaCardRevisao
                    key={f.folha}
                    folha={f.folha}
                    pecas={f.pecas}
                    arts={arts}
                    cobradoCm={f.cobradoCm}
                  />
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-card p-5">
                <div className="mb-4 text-sm font-bold text-foreground">
                  Artes deste pedido
                </div>
                <div className="flex flex-col gap-3">
                  {arts.map((a) => {
                    const dpi = calcularDpi(a.natW, a.larguraCm);
                    const alturaCm = Math.round((a.larguraCm / (a.natW / a.natH)) * 10) / 10;
                    const qtdPosicionada = pecas.filter(
                      (p) => p.artId === a.id && p.folha >= 0,
                    ).length;
                    return (
                      <div
                        key={a.id}
                        className="flex items-center gap-3.5 border-b border-border pb-3 last:border-0 last:pb-0"
                      >
                        <div className="h-12 w-12 flex-none overflow-hidden rounded-lg border border-border bg-background">
                          {/* eslint-disable-next-line @next/next/no-img-element -- miniatura de data URL local */}
                          <img src={a.src} alt="" className="h-full w-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold text-foreground">
                            {a.larguraCm} × {alturaCm} cm
                          </div>
                          <div className={`text-[13px] ${COR_FAIXA[faixaDpi(dpi)]}`}>
                            {dpi} DPI
                          </div>
                        </div>
                        <div className="text-[13px] font-bold whitespace-nowrap text-foreground">
                          {qtdPosicionada}×
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-7 text-center">
              <div className="mb-2 text-base font-bold text-foreground">
                Nenhuma montagem encontrada
              </div>
              <div className="mb-5 text-sm leading-relaxed text-muted-foreground">
                Monte sua folha de DTF pra ver a revisão do pedido aqui.
              </div>
              <Link
                href="/filme-dtf/montar"
                className="inline-block rounded-lg bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground"
              >
                Montar minha folha
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
              <div className="flex justify-between">
                <span>Artes na folha</span>
                <b className="text-foreground">{resumo.totalPecas || "—"}</b>
              </div>
              <div className="flex justify-between">
                <span>Folhas</span>
                <b className="text-foreground">{resumo.porFolha.length || "—"}</b>
              </div>
              <div className="flex justify-between">
                <span>Comprimento cobrado</span>
                <b className="text-foreground">
                  {resumo.totalCobradoCm > 0 ? `${resumo.totalCobradoCm} cm` : "—"}
                </b>
              </div>
              <div className="flex justify-between">
                <span>Aproveitamento</span>
                <b className="text-foreground">
                  {resumo.totalCobradoCm > 0 ? `${resumo.aproveitamentoPct}%` : "—"}
                </b>
              </div>
            </div>
            <div className="my-4 border-t border-border" />
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] text-muted-foreground">Total</span>
              <span className="font-heading text-[26px] text-primary">
                {brl(resumo.totalCentavos)}
              </span>
            </div>
            <div className="mt-1.5 text-xs text-muted-2">
              R$ 69,90 por metro · frete calculado no checkout.
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
              onClick={adicionarOutraFolha}
              className="mt-2.5 w-full rounded-xl border-2 border-foreground py-4 text-[15px] font-bold text-foreground disabled:cursor-not-allowed disabled:border-muted-2 disabled:text-muted-2"
            >
              Adicionar ao carrinho e montar outra folha
            </button>
            <Link
              href="/filme-dtf/montar"
              className="mt-3.5 block text-center text-[13px] font-bold text-secondary-foreground"
            >
              Voltar e ajustar a montagem
            </Link>
          </div>

          {carrinho.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 text-sm font-bold text-foreground">No carrinho</div>
              <div className="flex flex-col gap-2.5">
                {carrinho.map((c) => (
                  <div
                    key={c.id}
                    className="flex justify-between gap-3 text-[13px] text-muted-foreground"
                  >
                    <span>{descricaoItemCarrinho(c)}</span>
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
                  {brl(carrinho.reduce((s, c) => s + c.precoTotalCentavos, 0) + resumo.totalCentavos)}
                </b>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
