"use client";

import type { ReactNode } from "react";

export function EmBreveButton({
  className,
  children,
  etapa,
}: {
  className?: string;
  children: ReactNode;
  etapa: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.alert(`Próxima etapa: ${etapa} (ainda não criada).`)}
      className={className}
    >
      {children}
    </button>
  );
}
