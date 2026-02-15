import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  title: 'Saab Multimarcas - Veículos de Qualidade',
  description: 'A Saab Multimarcas oferece os melhores veículos seminovos e usados com qualidade garantida. Trabalhamos com as melhores marcas parceiras do mercado.',
  canonical: 'https://saabmultimarcas.com.br',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://saabmultimarcas.com.br',
    siteName: 'Saab Multimarcas',
    title: 'Saab Multimarcas - Veículos de Qualidade',
    description: 'A Saab Multimarcas oferece os melhores veículos seminovos e usados com qualidade garantida.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saab Multimarcas',
      },
    ],
  },
  twitter: {
    handle: '@saabmultimarcas',
    site: '@saabmultimarcas',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'veículos, carros usados, carros seminovos, multimarcas, compra e venda de veículos',
    },
    {
      name: 'author',
      content: 'Saab Multimarcas',
    },
  ],
};

export default config;
