import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SAAB Multimarcas - Veículos Seminovos, Usados e Zero KM em Presidente Prudente",
    template: "%s | SAAB Multimarcas"
  },
  description: "Revenda de veículos em Presidente Prudente - SP. Compra, venda e troca de carros seminovos, usados e zero km com financiamento facilitado, procedência garantida e atendimento transparente.",
  keywords: [
    "veículos seminovos Presidente Prudente",
    "carros usados Presidente Prudente",
    "carros zero km Presidente Prudente",
    "revenda de veículos",
    "SAAB Multimarcas",
    "financiamento de veículos",
    "compra e venda de carros",
    "troca de veículos",
    "carros com procedência garantida",
    "multimarcas Presidente Prudente"
  ],
  authors: [{ name: "SAAB Multimarcas" }],
  creator: "SAAB Multimarcas",
  publisher: "SAAB Multimarcas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://saabmultimarcas.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SAAB Multimarcas - Veículos Seminovos, Usados e Zero KM",
    description: "Revenda de veículos em Presidente Prudente com financiamento facilitado, procedência garantida e atendimento transparente.",
    url: "https://saabmultimarcas.com.br",
    siteName: "SAAB Multimarcas",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/saab-logo.png",
        width: 1200,
        height: 630,
        alt: "SAAB Multimarcas - Revenda de Veículos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAAB Multimarcas - Veículos Seminovos, Usados e Zero KM",
    description: "Revenda de veículos em Presidente Prudente com financiamento facilitado.",
    images: ["/saab-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/saab-logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/saab-logo.png" },
    ],
    shortcut: "/saab-logo.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#004c97" />
        <link rel="canonical" href="https://saabmultimarcas.com.br" />
        <StructuredData />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
