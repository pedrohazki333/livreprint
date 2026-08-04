"use client";

import { useRouter } from "next/navigation";
import { EmBreveButton } from "@/components/em-breve-button";
import { FILME } from "@/lib/constants";
import { calcularDpi, faixaDpi } from "@/lib/dpi";
import { brl } from "@/lib/format";
import { calcularResumo } from "@/lib/montagem-dtf/resumo";
import { useMontagemDtfStore } from "@/lib/montagem-dtf/store";

const COR_FAIXA: Record<string, string> = {
  otima: "text-primary",
  aceitavel: "text-warning",
  baixa: "text-danger",
};

export function PainelLateralDtf() {
  const router = useRouter();
  const arts = useMontagemDtfStore((s) => s.arts);
  const pecas = useMontagemDtfStore((s) => s.pecas);
  const selecionadoId = useMontagemDtfStore((s) => s.selecionadoId);
  const estourouFolhas = useMontagemDtfStore((s) => s.estourouFolhas);
  const atualizarLarguraArte = useMontagemDtfStore((s) => s.atualizarLarguraArte);
  const atualizarQtdArte = useMontagemDtfStore((s) => s.atualizarQtdArte);
  const removerArte = useMontagemDtfStore((s) => s.removerArte);
  const rotacionarPeca = useMontagemDtfStore((s) => s.rotacionarPeca);
  const espelharPeca = useMontagemDtfStore((s) => s.espelharPeca);
  const alinharPeca = useMontagemDtfStore((s) => s.alinharPeca);
  const toggleTravarPeca = useMontagemDtfStore((s) => s.toggleTravarPeca);
  const duplicarPeca = useMontagemDtfStore((s) => s.duplicarPeca);
  const removerPeca = useMontagemDtfStore((s) => s.removerPeca);
  const reencaixarTudo = useMontagemDtfStore((s) => s.reencaixarTudo);
  const limparTudo = useMontagemDtfStore((s) => s.limparTudo);

  const pecaSelecionada = pecas.find((p) => p.id === selecionadoId) ?? null;
  const resumo = calcularResumo(pecas);
  const temPecas = resumo.totalPecas > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3.5 text-sm font-bold text-foreground">Suas artes</div>
        {arts.length === 0 ? (
          <div className="text-[13px] leading-relaxed text-muted-2">
            Envie ao menos uma arte pra começar a montar a folha.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {arts.map((a) => {
              const dpi = calcularDpi(a.natW, a.larguraCm);
              const alturaCm = Math.round((a.larguraCm / (a.natW / a.natH)) * 10) / 10;
              return (
                <div key={a.id} className="rounded-xl border border-border p-3">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 flex-none overflow-hidden rounded-lg border border-border bg-background">
                      {/* eslint-disable-next-line @next/next/no-img-element -- miniatura de data URL local */}
                      <img src={a.src} alt="" className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-2">
                        <label className="flex-1">
                          <div className="mb-1 text-[10px] tracking-wide text-muted-2">
                            LARGURA (CM)
                          </div>
                          <input
                            type="number"
                            min={1}
                            value={a.larguraCm}
                            onChange={(e) =>
                              atualizarLarguraArte(a.id, parseFloat(e.target.value) || 1)
                            }
                            className="w-full rounded-lg border border-border px-2 py-1.5 text-[13px]"
                          />
                        </label>
                        <label className="w-20">
                          <div className="mb-1 text-[10px] tracking-wide text-muted-2">
                            QTD
                          </div>
                          <input
                            type="number"
                            min={1}
                            value={a.qtd}
                            onChange={(e) =>
                              atualizarQtdArte(a.id, parseInt(e.target.value, 10) || 1)
                            }
                            className="w-full rounded-lg border border-border px-2 py-1.5 text-[13px]"
                          />
                        </label>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <span className={`text-xs ${COR_FAIXA[faixaDpi(dpi)]}`}>
                          {alturaCm} cm de altura · {dpi} DPI
                        </span>
                        <button
                          type="button"
                          onClick={() => removerArte(a.id)}
                          className="text-xs font-bold text-danger"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3.5 text-sm font-bold text-foreground">Peça selecionada</div>
        {pecaSelecionada ? (
          <div className="flex flex-col gap-2.5">
            <div className="text-[13px] text-muted-foreground">
              {Math.round(pecaSelecionada.larguraCm * 10) / 10} ×{" "}
              {Math.round(pecaSelecionada.alturaCm * 10) / 10} cm
              {pecaSelecionada.rotacionado ? " · rotacionada" : ""}
              {pecaSelecionada.espelhada ? " · espelhada" : ""}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => rotacionarPeca(pecaSelecionada.id)}
                className="flex-1 rounded-lg border border-secondary-foreground/20 bg-secondary px-2 py-2 text-xs font-bold text-secondary-foreground"
              >
                Rotacionar 90°
              </button>
              <button
                type="button"
                onClick={() => espelharPeca(pecaSelecionada.id)}
                className="flex-1 rounded-lg border border-secondary-foreground/20 bg-secondary px-2 py-2 text-xs font-bold text-secondary-foreground"
              >
                Espelhar
              </button>
              <button
                type="button"
                onClick={() => duplicarPeca(pecaSelecionada.id)}
                className="flex-1 rounded-lg border border-secondary-foreground/20 bg-secondary px-2 py-2 text-xs font-bold text-secondary-foreground"
              >
                Duplicar
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => alinharPeca(pecaSelecionada.id, "esquerda")}
                className="flex-1 rounded-lg border border-border px-2 py-2 text-xs font-bold text-foreground"
              >
                Alinhar ←
              </button>
              <button
                type="button"
                onClick={() => alinharPeca(pecaSelecionada.id, "centro")}
                className="flex-1 rounded-lg border border-border px-2 py-2 text-xs font-bold text-foreground"
              >
                Centro
              </button>
              <button
                type="button"
                onClick={() => alinharPeca(pecaSelecionada.id, "direita")}
                className="flex-1 rounded-lg border border-border px-2 py-2 text-xs font-bold text-foreground"
              >
                Alinhar →
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toggleTravarPeca(pecaSelecionada.id)}
                className="flex-1 rounded-lg border border-border px-2 py-2 text-xs font-bold text-foreground"
              >
                {pecaSelecionada.travada ? "Destravar posição" : "Travar posição"}
              </button>
              <button
                type="button"
                onClick={() => removerPeca(pecaSelecionada.id)}
                className="flex-1 text-center text-xs font-bold text-danger"
              >
                Remover cópia
              </button>
            </div>
            <div className="text-xs text-muted-2">
              Arraste na folha pra reposicionar. Peças travadas ficam paradas
              quando você reencaixa tudo.
            </div>
          </div>
        ) : (
          <div className="text-[13px] leading-relaxed text-muted-2">
            Clique numa arte na folha pra rotacionar, espelhar, duplicar,
            travar ou alinhar.
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={reencaixarTudo}
          className="flex-1 rounded-lg border border-secondary-foreground/20 bg-secondary px-3 py-2.5 text-[13px] font-bold text-secondary-foreground"
        >
          Reencaixar tudo automaticamente
        </button>
        <button
          type="button"
          onClick={limparTudo}
          className="rounded-lg border border-border bg-card px-3 py-2.5 text-[13px] font-bold text-foreground"
        >
          Limpar folhas
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3.5 text-sm font-bold text-foreground">Seu pedido</div>
        <div className="flex flex-col gap-2.5 text-[13px] text-muted-foreground">
          <div className="flex justify-between">
            <span>Artes na folha</span>
            <b className="text-foreground">{resumo.totalPecas}</b>
          </div>
          <div className="flex justify-between">
            <span>Folhas usadas</span>
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
        <div className="mt-3 rounded-lg bg-muted px-3 py-2.5 text-xs text-muted-foreground">
          Cortamos a folha até onde a sua arte vai e cobramos proporcional:
          R$ 69,90 o metro (56 cm de largura), arredondado de 5 em 5 cm, com
          mínimo de 30 cm por folha.
        </div>
        <div className="my-4 border-t border-border" />
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] text-muted-foreground">Total estimado</span>
          <span className="font-heading text-2xl text-primary">
            {brl(resumo.totalCentavos)}
          </span>
        </div>

        {estourouFolhas && (
          <div className="mt-3 rounded-lg border border-warning-border bg-warning-bg px-3.5 py-2.5 text-xs text-warning">
            Você passou de {FILME.MAX_CHAPAS} folhas. Pra esse volume, envie o
            arquivo já diagramado em vez de montar aqui.
            <EmBreveButton
              etapa="envio de arquivo pronto pra volumes grandes"
              className="mt-2 block w-full rounded-lg bg-warning px-3 py-2 text-center text-xs font-bold text-warning-bg"
            >
              Enviar arquivo pronto
            </EmBreveButton>
          </div>
        )}

        <button
          type="button"
          disabled={!temPecas}
          onClick={() => router.push("/filme-dtf/montar/revisao")}
          className="mt-4 w-full rounded-xl bg-primary py-4 text-[15px] font-bold text-primary-foreground disabled:cursor-not-allowed disabled:bg-muted-2"
        >
          Ir para revisão
        </button>
        {!temPecas && (
          <div className="mt-2 text-center text-xs text-muted-2">
            Envie ao menos uma arte pra continuar.
          </div>
        )}
      </div>
    </div>
  );
}
