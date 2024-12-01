import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/requests.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript type-checking during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint checks during build
  },
  // Add other Next.js configuration options as needed
};

export default withNextIntl(nextConfig);
