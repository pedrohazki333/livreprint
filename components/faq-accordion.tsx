"use client";

import { useState } from "react";

export type FaqItem = {
  pergunta: string;
  resposta: string;
};

export function FaqAccordion({ itens }: { itens: FaqItem[] }) {
  const [aberta, setAberta] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {itens.map((item, i) => {
        const isOpen = aberta === i;
        return (
          <div
            key={item.pergunta}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <button
              type="button"
              onClick={() => setAberta((s) => (s === i ? -1 : i))}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-bold text-foreground">
                {item.pergunta}
              </span>
              <span className="min-w-5 text-center font-heading text-xl text-primary">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                {item.resposta}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
