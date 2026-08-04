import type { Metadata } from "next";
import { Archivo_Black, Arimo } from "next/font/google";
import "./globals.css";

const arimo = Arimo({
  variable: "--font-sans",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Livreprint — Estamparia DTF",
  description:
    "Personalize camisetas, moletons e polos ou peça seu DTF por metro. Produção própria, do início ao fim.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${arimo.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
