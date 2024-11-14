import type { Metadata } from "next";
import localFont from "next/font/local";
// import { NextIntlClientProvider } from 'next-intl';
// import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  // const messages = await getMessages();
  // toDO - internationalization
  return (
    <html lang='em'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {/* <NextIntlClientProvider messages={messages}> */}
        <main className="mx-auto max-w-[1920px]">
          {children}
        </main>
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
