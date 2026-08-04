"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductPhoto } from "@/components/product-photo";
import { TAMANHOS, type Tamanho } from "@/lib/catalog/data";
import type { Produto } from "@/lib/catalog/types";

export function ProdutoConfigurador({ produto }: { produto: Produto }) {
  const router = useRouter();
  const [colorIdx, setColorIdx] = useState(0);
  const [tecidoIdx, setTecidoIdx] = useState(0);
  const [qtd, setQtd] = useState<Record<Tamanho, number>>({
    P: 0,
    M: 0,
    G: 0,
    GG: 0,
  });

  const total = useMemo(
    () => TAMANHOS.reduce((soma, t) => soma + qtd[t], 0),
    [qtd],
  );

  const alterarQtd = (tamanho: Tamanho, delta: number) => {
    setQtd((s) => ({ ...s, [tamanho]: Math.max(0, s[tamanho] + delta) }));
  };

  const criarPersonalizacao = () => {
    if (total === 0) return;
    const params = new URLSearchParams({
      cor: String(colorIdx),
      tecido: String(tecidoIdx),
    });
    TAMANHOS.forEach((t) => {
      if (qtd[t] > 0) params.set(t, String(qtd[t]));
    });
    router.push(`/personalizar/${produto.slug}?${params.toString()}`);
  };

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-8 py-8 md:grid-cols-2 md:gap-14 md:py-10">
      <div className="md:sticky md:top-24">
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-border"
          style={{ background: produto.cores[colorIdx]?.hex }}
        >
          <ProductPhoto src={produto.imagemProduto} alt={produto.nome} />
        </div>
      </div>

      <div>
        <div className="mb-3 text-[13px] font-bold tracking-[2px] text-primary">
          {produto.categoria}
        </div>
        <h1 className="mb-3 font-heading text-[28px] text-foreground md:text-[36px]">
          {produto.nome}
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-muted-foreground">
          {produto.descricao}
        </p>

        <div className="mb-7">
          <div className="mb-3 text-sm font-bold text-foreground">
            Cor da peça
          </div>
          <div className="flex gap-3">
            {produto.cores.map((cor, i) => (
              <button
                key={cor.nome}
                type="button"
                title={cor.nome}
                onClick={() => setColorIdx(i)}
                className="h-12 w-12 rounded-full border-2 p-[3px]"
                style={{
                  borderColor:
                    i === colorIdx ? "var(--primary)" : "transparent",
                }}
              >
                <span
                  className="block h-full w-full rounded-full border border-border"
                  style={{ background: cor.hex }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-7">
          <div className="mb-3 text-sm font-bold text-foreground">
            {produto.tecidoLabel}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {produto.tecidos.map((tecido, i) => (
              <button
                key={tecido}
                type="button"
                onClick={() => setTecidoIdx(i)}
                className={`rounded-full px-4 py-2.5 text-[13px] font-semibold ${
                  i === tecidoIdx
                    ? "bg-primary text-primary-foreground"
                    : "border border-secondary-foreground/20 bg-secondary text-secondary-foreground"
                }`}
              >
                {tecido}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-bold text-foreground">
              Quantidade por tamanho
            </div>
            <div className="text-[13px] text-muted-foreground">
              Total: <b className="text-foreground">{total}</b> peça(s)
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {TAMANHOS.map((tamanho) => (
              <div
                key={tamanho}
                className="flex items-center justify-between rounded-[10px] border border-border bg-card px-4 py-2.5"
              >
                <div className="text-sm font-bold text-foreground">
                  {tamanho}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => alterarQtd(tamanho, -1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary font-bold text-secondary-foreground"
                  >
                    −
                  </button>
                  <div className="w-6 text-center text-sm font-bold">
                    {qtd[tamanho]}
                  </div>
                  <button
                    type="button"
                    onClick={() => alterarQtd(tamanho, 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary font-bold text-secondary-foreground"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={criarPersonalizacao}
          disabled={total === 0}
          className="mt-4 w-full rounded-xl bg-primary py-[18px] text-base font-bold text-primary-foreground disabled:cursor-not-allowed disabled:bg-muted-2"
        >
          Criar personalização
        </button>
        {total === 0 && (
          <div className="mt-2.5 text-center text-[13px] text-muted-2">
            Escolha ao menos 1 peça em algum tamanho pra continuar.
          </div>
        )}
      </div>
    </section>
  );
}
