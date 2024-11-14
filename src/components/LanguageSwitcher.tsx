import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useIntl } from 'next-intl';

const LanguageSwitch = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const { formatMessage } = useIntl();

  const toggleLanguage = () => {
    const currentLocale = searchParams.get('locale') || 'en';
    const newLocale = currentLocale === 'en' ? 'ne' : 'en';

    push(`${pathname}?locale=${newLocale}`);
  };

  return (
    <button onClick={toggleLanguage}>
      {formatMessage({ id: 'language-switch' })}
    </button>
  );
};

export default LanguageSwitch;