import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'مبادرة الحياة الطيبة - مركز الحياة الطيبة للتدريب والتطوير المهني',
  description: 'مركز الحياة الطيبة للتدريب والتطوير المهني - بناء الأفراد وتحقيق الازدهار من خلال برامج تدريبية شاملة تعزز التوازن بين الجوانب الروحية والعقلية والجسدية والاجتماعية والعاطفية',
  keywords: 'التنمية، التدريب، الحياة الطيبة، قطر، التطوير المهني، التوازن، الروحانية، التدريب الشامل، بناء الشخصية، التنمية البشرية، الازدهار، التعليم، الاستشارات',
  authors: [{ name: 'مركز الحياة الطيبة للتدريب والتطوير المهني' }],
  creator: 'مركز الحياة الطيبة للتدريب والتطوير المهني',
  publisher: 'مركز الحياة الطيبة للتدريب والتطوير المهني',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: 'https://wellbeing-center.com',
    siteName: 'مبادرة الحياة الطيبة',
    title: 'مبادرة الحياة الطيبة - مركز الحياة الطيبة للتدريب والتطوير المهني',
    description: 'مركز الحياة الطيبة للتدريب والتطوير المهني - بناء الأفراد وتحقيق الازدهار من خلال برامج تدريبية شاملة تعزز التوازن بين الجوانب الروحية والعقلية والجسدية والاجتماعية والعاطفية',
    images: [
      {
        url: '/logo_no_bg.png',
        width: 1200,
        height: 630,
        alt: 'شعار مبادرة الحياة الطيبة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مبادرة الحياة الطيبة - مركز الحياة الطيبة للتدريب والتطوير المهني',
    description: 'مركز الحياة الطيبة للتدريب والتطوير المهني - بناء الأفراد وتحقيق الازدهار من خلال برامج تدريبية شاملة تعزز التوازن بين الجوانب الروحية والعقلية والجسدية والاجتماعية والعاطفية',
    images: ['/logo_no_bg.png'],
    creator: '@wellbeing_center',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://wellbeing-center.com',
    languages: {
      'ar': 'https://wellbeing-center.com',
      'x-default': 'https://wellbeing-center.com',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "مركز الحياة الطيبة للتدريب والتطوير المهني",
              "description": "مركز الحياة الطيبة للتدريب والتطوير المهني - بناء الأفراد وتحقيق الازدهار من خلال برامج تدريبية شاملة تعزز التوازن بين الجوانب الروحية والعقلية والجسدية والاجتماعية والعاطفية",
              "url": "https://wellbeing-center.com",
              "logo": "https://wellbeing-center.com/logo_no_bg.png",
              "image": "https://wellbeing-center.com/assets/images/father_children_1920_1.png",
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
            })
          }}
        />
      </head>
      <body className="font-pingfang">
        {children}
      </body>
    </html>
  );
}
