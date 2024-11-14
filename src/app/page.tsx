// import Link from 'next/link'
import MapSection from "@/components/section/MapStatsSection";
// import {useTranslations} from 'next-intl';
// import LanguageSwitcher from '@/components/LanguageSwitcher';
import DetailedProfileSection from "@/components/section/SectorSection";
// import { useTranslation } from 'next-i18next';

export default function Home() {
    // const {t} = useTranslation();
    return (
        <div className='bg-white h-full pb-4'>
            <MapSection />
            <DetailedProfileSection/>
        </div>
    );
}
