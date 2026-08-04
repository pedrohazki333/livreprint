import { notFound, redirect } from "next/navigation";
import { EditorShell } from "@/components/configurador/editor-shell";
import { TAMANHOS, getProduto } from "@/lib/catalog/data";
import { precoTotalPeca, precoUnitarioPeca } from "@/lib/pricing/peca";

export default async function PersonalizarPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const produto = getProduto(slug);
  if (!produto) notFound();

  const sp = await searchParams;
  const asString = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const corIdx = Number(asString(sp.cor) ?? 0) || 0;
  const tecidoIdx = Number(asString(sp.tecido) ?? 0) || 0;

  const tamanhos = TAMANHOS.map((t) => ({
    tamanho: t,
    qtd: Math.max(0, parseInt(asString(sp[t]) ?? "0", 10) || 0),
  }));
  const totalQty = tamanhos.reduce((s, t) => s + t.qtd, 0);

  if (totalQty < 1) {
    redirect(`/produto/${slug}`);
  }

  const precoUnitarioCentavos = precoUnitarioPeca(totalQty);
  const precoTotalCentavos = precoTotalPeca(totalQty);

  return (
    <EditorShell
      slug={produto.slug}
      produtoNome={produto.nome}
      cor={produto.cores[corIdx]?.nome ?? produto.cores[0].nome}
      corHex={produto.cores[corIdx]?.hex ?? produto.cores[0].hex}
      tecido={produto.tecidos[tecidoIdx] ?? produto.tecidos[0]}
      tamanhos={tamanhos}
      precoUnitarioCentavos={precoUnitarioCentavos}
      precoTotalCentavos={precoTotalCentavos}
    />
  );
}
