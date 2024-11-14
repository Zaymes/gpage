import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async (context) => {
  // Get the locale from the request
  const locale = context.locale || 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});