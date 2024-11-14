import createNextIntlPlugin from 'next-intl/plugin';
// const { i18n } = require("./next-i18next.config");
const withNextIntl = createNextIntlPlugin('./src/i18n/requests.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || 'http://localhost:3000/',
  }
};

export default withNextIntl(nextConfig);