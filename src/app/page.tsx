'use client'
// import Link from 'next/link'
import MapSection from "@/components/section/MapStatsSection";
// import {useTranslations} from 'next-intl';
// import LanguageSwitcher from '@/components/LanguageSwitcher';
import DetailedProfileSection from "@/components/section/SectorSection";
// const SharedStateContext = React.createContext();
// import { useTranslation } from 'next-i18next';
import { useState, createContext } from "react";
import { WardContext } from "./ProfileContext";


export default function Home() {
    // const {t} = useTranslation();
    const [ward, setWard] = useState<string>('Municipal')
    return (
        <WardContext.Provider value={{ward, setWard}}>
            <MapSection />
            <DetailedProfileSection />
        </WardContext.Provider>
    );
}
