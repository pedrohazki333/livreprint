"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ProductPhotoProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Foto de produto com fallback visual caso o arquivo em `src` não exista ou
 * não carregue — o design importado do Claude Design não trouxe as fotos
 * reais (limite de tamanho do fetch), então até alguém colocar os arquivos
 * de verdade em `public/mockups/`, isto mostra um painel com o nome da peça.
 */
export function ProductPhoto({ src, alt, className }: ProductPhotoProps) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-secondary p-6 text-center",
          className,
        )}
      >
        <span className="font-heading text-lg text-secondary-foreground">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("object-cover object-top", className)}
      onError={() => setBroken(true)}
    />
  );
}
