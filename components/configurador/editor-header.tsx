import Link from "next/link";

const PASSOS_PADRAO = ["Personalizar", "Revisão", "Checkout"] as const;

export function EditorHeader({
  passoAtivo,
  voltarHref,
  voltarLabel = "← Voltar",
  passos = PASSOS_PADRAO,
}: {
  passoAtivo: 1 | 2 | 3;
  voltarHref: string;
  voltarLabel?: string;
  passos?: readonly [string, string, string];
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex flex-col leading-[0.9]">
          <span className="font-heading text-[22px] tracking-tight text-primary">
            livreprint
          </span>
          <span className="mt-1 text-[8px] tracking-[3px] text-primary">
            ESTAMPARIA DTF
          </span>
        </Link>

        <div className="hidden items-center gap-2.5 text-[13px] text-muted-2 sm:flex">
          {passos.map((label, i) => {
            const num = i + 1;
            const ativo = num === passoAtivo;
            return (
              <span key={label} className="flex items-center gap-2.5">
                {i > 0 && <span>→</span>}
                <span className={ativo ? "font-bold text-primary" : ""}>
                  {num}. {label}
                </span>
              </span>
            );
          })}
        </div>

        <Link href={voltarHref} className="text-sm font-semibold text-muted-foreground">
          {voltarLabel}
        </Link>
      </div>
    </header>
  );
}
