import { createNavigation } from 'next-intl/navigation';
 
export const locales = ['en', 'ne'] as const;
export const defaultLocale = 'en' as const;
 
export const { Link, redirect, usePathname, useRouter } = createNavigation({ locales });