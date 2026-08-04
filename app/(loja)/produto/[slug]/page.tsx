import Link from "next/link";
import { notFound } from "next/navigation";
import { ProdutoConfigurador } from "@/components/produto-configurador";
import { getProduto } from "@/lib/catalog/data";

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produto = getProduto(slug);
  if (!produto) notFound();

  return (
    <>
      <div className="mx-auto max-w-6xl px-8 pt-6">
        <Link
          href="/catalogo"
          className="text-sm font-semibold text-muted-foreground"
        >
          ← Voltar ao catálogo
        </Link>
      </div>

      <ProdutoConfigurador produto={produto} />
    </>
  );
}
