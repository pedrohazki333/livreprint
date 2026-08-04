import type { Metadata } from "next";
import Link from "next/link";
import { ProductPhoto } from "@/components/product-photo";
import { PRODUTOS } from "@/lib/catalog/data";

export const metadata: Metadata = {
  title: "Catálogo — Livreprint",
};

export default function CatalogoPage() {
  return (
    <>
      <section className="mx-auto max-w-2xl px-8 pt-16 pb-10 text-center">
        <div className="mb-3.5 text-[13px] font-bold tracking-[2px] text-primary">
          CATÁLOGO
        </div>
        <h1 className="font-heading text-[30px] leading-tight tracking-tight text-foreground md:text-[38px]">
          Escolha sua peça pra personalizar
        </h1>
      </section>

      <section className="mx-auto max-w-6xl px-8 pb-24">
        <div className="mx-auto grid max-w-[420px] grid-cols-1 gap-7 md:max-w-none md:grid-cols-3">
          {PRODUTOS.map((p) => (
            <Link
              key={p.slug}
              href={`/produto/${p.slug}`}
              className="block overflow-hidden rounded-[20px] border border-border bg-card hover:border-primary"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <ProductPhoto src={p.imagemCatalogo} alt={p.nome} />
              </div>
              <div className="p-6 text-center">
                <div className="mb-2 font-heading text-xl text-foreground">
                  {p.nome}
                </div>
                <div className="mb-[18px] text-sm text-muted-foreground">
                  {p.tagline}
                </div>
                <div className="inline-block rounded-lg bg-primary px-[22px] py-[11px] text-sm font-bold text-primary-foreground">
                  Personalizar
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
