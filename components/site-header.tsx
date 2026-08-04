import Link from "next/link";

const NAV_ITEMS = [
  { href: "/catalogo", label: "Peça personalizada" },
  { href: "/filme-dtf", label: "DTF por metro" },
  { href: "/#tecnologia", label: "Como funciona" },
  { href: "/#faq", label: "FAQ" },
];

type SiteHeaderProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteHeader({
  ctaHref = "/catalogo",
  ctaLabel = "Ver catálogo",
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 py-4">
        <Link href="/" className="flex flex-col leading-[0.9]">
          <span className="font-heading text-2xl tracking-tight text-primary">
            livreprint
          </span>
          <span className="mt-1.5 text-[9px] tracking-[3px] text-primary">
            ESTAMPARIA DTF
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-semibold text-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={ctaHref}
          className="whitespace-nowrap rounded-lg bg-primary px-[22px] py-3 text-[15px] font-bold text-primary-foreground hover:bg-primary/90"
        >
          {ctaLabel}
        </Link>
      </div>

      <nav className="flex gap-5 overflow-x-auto border-t border-border px-[18px] py-2.5 md:hidden">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap text-sm font-semibold text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
