import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAAB Multimarcas - Veículos Seminovos, Usados e Zero KM em Presidente Prudente",
  description: "Revenda de veículos em Presidente Prudente - SP. Compra, venda e troca de carros seminovos, usados e zero km com financiamento facilitado, procedência garantida e atendimento transparente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
