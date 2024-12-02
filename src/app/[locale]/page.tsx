import MapSection from "@/components/section/MapStatsSection";
import DetailedProfileSection from "@/components/section/SectorSection";
import {getTranslations} from 'next-intl/server';
 
export async function generateMetadata({params: {locale}}) {
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    title: t('title')
  };
}

export default function Home() {

    return (
        <>
            <MapSection />
            <DetailedProfileSection />
        </>
    );
}
