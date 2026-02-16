export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "name": "SAAB Multimarcas",
    "description": "Revenda de veículos seminovos, usados e zero km em Presidente Prudente - SP",
    "url": "https://saabmultimarcas.com.br",
    "logo": "https://saabmultimarcas.com.br/saab-logo.png",
    "image": "https://saabmultimarcas.com.br/saab-fachada.jpeg",
    "telephone": "+55-18-99725-1860",
    "email": "Adm.saabmultimarcas@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Joaquim Constantino, 1868",
      "addressLocality": "Presidente Prudente",
      "addressRegion": "SP",
      "postalCode": "19050-220",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-22.1209",
      "longitude": "-51.3887"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "priceRange": "$$",
    "sameAs": [
      "https://www.instagram.com/saab_multimarcas/",
      "https://wa.me/5518997251860"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SAAB Multimarcas",
    "image": "https://saabmultimarcas.com.br/saab-fachada.jpeg",
    "@id": "https://saabmultimarcas.com.br",
    "url": "https://saabmultimarcas.com.br",
    "telephone": "+55-18-99725-1860",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Joaquim Constantino, 1868",
      "addressLocality": "Presidente Prudente",
      "addressRegion": "SP",
      "postalCode": "19050-220",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-22.1209",
      "longitude": "-51.3887"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
