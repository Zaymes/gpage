import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import {getMessages} from 'next-intl/server';
import { locales } from '@/i18n/navigation';
import { Providers } from "@/components/Providers";
import { fetchResourceData } from "@/lib/api/ckan";
import "../globals.css";

type Locale = typeof locales[number]; 

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const RESOURCE_IDS = {
  wardData: 'f8791dae-3839-4e9d-9dd0-f68edd0ade75',
  categoryData: '9f5f3673-ed24-4f9d-ac55-da769264e1c3',
  yearlyData: 'a80e6f91-718e-4af5-a0ac-cfafc2858bad',
  mainBannerData: '798e979b-959f-4def-bb13-0ce8630da293',
};

export default async function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  if (!locales.includes(locale as Locale)) {
    notFound(); // Handle invalid locale
    return null; // Avoid further rendering
  }

    // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Fetch initial data
  const [wardData, categoryData, yearlyData, mainBannerData] = await Promise.all([
    fetchResourceData(RESOURCE_IDS.wardData),
    fetchResourceData(RESOURCE_IDS.categoryData),
    fetchResourceData(RESOURCE_IDS.yearlyData),
    fetchResourceData(RESOURCE_IDS.mainBannerData)
  ]);

  const initialData = {
    wardData,
    categoryData,
    yearlyData,
    mainBannerData
  };

  return (
    <html lang={locale}>
      <body className={`antialiased bg-white`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers data={initialData}>
            <main className="mx-auto">
              {children}
            </main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}