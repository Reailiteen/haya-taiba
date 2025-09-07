import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

const SEOHead = ({
  title = "مبادرة الحياة الطيبة - مركز الحياة الطيبة للتدريب والتطوير المهني",
  description = "مركز الحياة الطيبة للتدريب والتطوير المهني - بناء الأفراد وتحقيق الازدهار من خلال برامج تدريبية شاملة تعزز التوازن بين الجوانب الروحية والعقلية والجسدية والاجتماعية والعاطفية",
  keywords = "التنمية، التدريب، الحياة الطيبة، قطر، التطوير المهني، التوازن، الروحانية، التدريب الشامل، بناء الشخصية، التنمية البشرية، الازدهار، التعليم، الاستشارات",
  ogImage = "/assets/logo.webp",
  url = "https://wellbeing-center.com"
}: SEOHeadProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "مركز الحياة الطيبة للتدريب والتطوير المهني",
    "description": description,
    "url": url,
    "logo": `${url}/assets/logo.webp`,
    "image": `${url}/assets/father_children_1920_1.png`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "QA",
      "addressLocality": "قطر"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Arabic", "ar"]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Qatar"
    },
    "serviceType": [
      "التدريب والتطوير المهني",
      "الاستشارات النفسية والاجتماعية",
      "برامج التنمية الشخصية",
      "التدريب على الحياة الطيبة"
    ],
    "foundingDate": "2024",
    "slogan": "بناء الأفراد وتحقيق الازدهار"
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="ar" />
      <meta name="author" content="مركز الحياة الطيبة للتدريب والتطوير المهني" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="ar" />
      <meta name="theme-color" content="#45B7D1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ar_AR" />
      <meta property="og:site_name" content="مبادرة الحياة الطيبة" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${url}${ogImage}`} />
      <meta property="twitter:creator" content="@wellbeing_center" />
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#45B7D1" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Hreflang for Arabic */}
      <link rel="alternate" hrefLang="ar" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Head>
  );
};

export default SEOHead;

