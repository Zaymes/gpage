
"use client"
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  Users,
  HeartPulse,
  GraduationCap,
  Building2,
  Briefcase,
  HousePlus,
  Baby,
  LandPlot
} from "lucide-react";

import { DefaultContent } from '../Charts';
import PopulationContent from '../profile/Population';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
// import { ClientOnly } from '../BrowserOnly';

// Navigation Component

// Dynamic import for client-side only components
const ClientOnly = dynamic(() => import('../BrowserOnly'), { ssr: false });

const SectorNavigation = ({ activeSector, onSectorChange }) => {
  const locale = useLocale()
  const sectorNavRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure this only runs on the client
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const sectorNavElement = sectorNavRef.current;
        if (sectorNavElement) {
          const sectorNavRect = sectorNavElement.getBoundingClientRect();
          const isInView =
            sectorNavRect.top >= 0 &&
            sectorNavRect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

          if (isInView) {
            sectorNavElement.classList.add('sticky', 'top-0', 'z-50');
          } else {
            sectorNavElement.classList.remove('sticky', 'top-0', 'z-50');
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const sectorNavItems = [
    { id: 'population', label: 'Population', label_ne: 'जनसंख्या', Icon: Users },
    { id: 'familyAndHousing', label: 'Family and Housing', label_ne: 'परिवार र आवास', Icon: HousePlus },
    { id: 'health', label: 'Healthcare', label_ne: 'स्वास्थ्य', Icon: HeartPulse },
    { id: 'education', label: 'Education', label_ne: 'शिक्षा', Icon: GraduationCap },
    { id: 'economy', label: 'Economy', label_ne: 'अर्थतन्त्र', Icon: Briefcase },
    { id: 'social', label: 'Agriculture and Land', label_ne: 'कृषि र भूमि', Icon: LandPlot },
    { id: 'infrastructure', label: 'Infrastructure', label_ne: 'पूर्वाधार', Icon: Building2 },
    { id: 'transportation', label: 'Women and Children', label_ne: 'महिला र बालबालिका', Icon: Baby },
  ];

  // If not client-side, return null or a placeholder
  if (!isClient) {
    return null;
  }

  return (
    <ClientOnly>
      <div
        ref={sectorNavRef}
        className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-sm"
      >
        {sectorNavItems.map((item) => {
          const IconComponent = item.Icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectorChange(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm
              ${activeSector === item.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {IconComponent && <IconComponent className="w-4 h-4" />}
              <span>{locale === "en" ? item.label : item.label_ne}</span>
            </button>
          );
        })}
      </div>
    </ClientOnly>
  );
};

// The rest of your component remains the same...







// Main Sector View Component
const SectorView = ({ sector }) => {
  const contentMap = {
    population: <PopulationContent category='population' />,
    familyAndHousing: <PopulationContent category='family and household' />,
    health: <PopulationContent category='health' />,
    education: <PopulationContent category='education' />,
    infrastructure: <DefaultContent sector="Infrastructure" />,
    transportation: <PopulationContent category="women and children" />,
    environment: <PopulationContent category="agriculture" />,
    social: <PopulationContent category="agriculture" />,
    safety: <DefaultContent sector="Safety" />,
    economy: <PopulationContent category='economy' />,
  };

  return (
    <div className="bg-white px-6 rounded-lg shadow-sm">
      {contentMap[sector]}
    </div>
  );
};

const DetailedProfileSection = () => {
  // const {ward} = useWard()
  const t = useTranslations()
  const [activeSector, setActiveSector] = useState('population')
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 pl-4">{t('common.profile_topics')}</h2>
      <SectorNavigation
        activeSector={activeSector}
        onSectorChange={setActiveSector}
      />
      <SectorView sector={activeSector} />
    </div>
  )
}

export default DetailedProfileSection;
