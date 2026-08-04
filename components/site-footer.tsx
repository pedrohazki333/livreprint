import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-dark px-8 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 border-b border-dark-border pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-heading text-2xl text-dark-accent">
              livreprint
            </div>
            <div className="mt-2 mb-4 text-[9px] tracking-[3px] text-dark-accent">
              ESTAMPARIA DTF
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-dark-foreground/70">
              Estamparia DTF ponta a ponta: peças personalizadas e DTF por
              metro, produzidos por nós do início ao fim.
            </p>
          </div>

          <div>
            <div className="mb-4 text-sm font-bold text-dark-foreground">
              Navegação
            </div>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/catalogo"
                className="text-sm text-dark-foreground/70 hover:text-dark-accent"
              >
                Peça personalizada
              </Link>
              <Link
                href="/filme-dtf"
                className="text-sm text-dark-foreground/70 hover:text-dark-accent"
              >
                DTF por metro
              </Link>
              <Link
                href="/#tecnologia"
                className="text-sm text-dark-foreground/70 hover:text-dark-accent"
              >
                Como funciona
              </Link>
              <Link
                href="/#faq"
                className="text-sm text-dark-foreground/70 hover:text-dark-accent"
              >
                FAQ
              </Link>
            </div>
          </div>

          <div>
            <div className="mb-4 text-sm font-bold text-dark-foreground">
              Contato
            </div>
            <div className="flex flex-col gap-2.5">
              <a
                href="#"
                className="text-sm text-dark-foreground/70 hover:text-dark-accent"
              >
                WhatsApp
              </a>
              <a
                href="#"
                className="text-sm text-dark-foreground/70 hover:text-dark-accent"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm text-dark-foreground/70 hover:text-dark-accent"
              >
                contato@livreprint.com.br
              </a>
            </div>
          </div>
        </div>
        <div className="pt-6 text-[13px] text-dark-foreground/50">
          © 2026 Livreprint Estamparia DTF. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
