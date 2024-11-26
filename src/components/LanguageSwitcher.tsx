import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

const LanguageSwitch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Define your supported locales
  const locales = ['en', 'ne'];

  // Mapping of locale codes to display names
  const localeNames = {
    'en': 'English',
    'ne': 'नेपाली'
  };

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    
    // Create a new URL with the updated locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Language Switch Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-md hover:bg-gray-100 focus:outline-none"
        aria-label="Switch Language"
      >
        <Globe className="h-5 w-5 text-gray-600" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50"
          role="menu"
          aria-orientation="vertical"
        >
          {locales.map((localeOption) => (
            <button
              key={localeOption}
              onClick={() => switchLocale(localeOption)}
              disabled={locale === localeOption}
              className={`
                w-full text-left px-4 py-2 
                ${locale === localeOption 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'hover:bg-gray-100 focus:bg-gray-100'}
                transition-colors duration-200
              `}
              aria-disabled={locale === localeOption}
            >
              {localeNames[localeOption]}
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitch;