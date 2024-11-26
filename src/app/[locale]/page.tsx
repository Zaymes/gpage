'use client'
// import Link from 'next/link'
import MapSection from "@/components/section/MapStatsSection";
// import {useTranslations} from 'next-intl';
// import LanguageSwitcher from '@/components/LanguageSwitcher';
import DetailedProfileSection from "@/components/section/SectorSection";
// const SharedStateContext = React.createContext();
// import { useTranslation } from 'next-i18next';
import { useState, createContext } from "react";
import { WardContext } from "../ProfileContext";
import { useData } from '@/contexts/DataContext';
import { useTranslations } from 'next-intl';


export default function Home({params:{locale}}) {
    // const {t} = useTranslation();
    const [ward, setWard] = useState<string>('Municipal')
    const { wardData, categoryData, yearlyData, mainBannerData, isLoading, error } = useData();
    const t = useTranslations();

    console.log('Current Locale: MAIN BANNER', mainBannerData)

    if (isLoading) return <div>{t('common.loading')}</div>;
    if (error) return <div>{t('common.error', { message: error.message })}</div>;
    return (
        <WardContext.Provider value={{ward, setWard}}>
            <MapSection />
            <DetailedProfileSection />
        </WardContext.Provider>
    );
}
