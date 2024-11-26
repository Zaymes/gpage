import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/requests.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your other Next.js config options here
  // images: {
  //   domains: ['your-domain.com'],
  // },
  // Add other configuration options as needed
};

export default withNextIntl(nextConfig);