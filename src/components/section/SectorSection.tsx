
"use client"
import React, { useState, useEffect, useRef} from 'react';
import {
  Users,
  HeartPulse,
  GraduationCap,
  Building2,
  Bus,
  Tree,
  Shield,
  Briefcase,
  Handshake,
  HousePlus,
} from "lucide-react";

import { DefaultContent } from '../Charts';
import PopulationContent from '../profile/Population';
import { useData } from '@/contexts/DataContext';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

// Navigation Component

const SectorNavigation = ({ activeSector, onSectorChange }) => {
  // Navigation items configuration
  const t = useTranslations()
  const locale = useLocale()
  const sectorNavItems = [
    { id: 'population', label: 'Population', label_ne: 'जनसंख्या', Icon: Users },
    { id: 'familyAndHousing', label: 'Family and Housing', label_ne: 'परिवार र आवास', Icon: HousePlus },
    { id: 'health', label: 'Healthcare', label_ne: 'स्वास्थ्य', Icon: HeartPulse },
    { id: 'education', label: 'Education', label_ne: 'शिक्षा', Icon: GraduationCap },
    { id: 'economy', label: 'Economy', label_ne: 'अर्थतन्त्र', Icon: Briefcase },
    { id: 'social', label: 'Agriculture and Land', label_ne: 'कृषि र भूमि', Icon: Handshake },
    { id: 'infrastructure', label: 'Infrastructure', label_ne: 'पूर्वाधार', Icon: Building2 },
    { id: 'transportation', label: 'Women and Children', label_ne: 'महिला र बालबालिका', Icon: Bus },
    // { id: 'environment', label: 'Agricutlure and Environment', Icon: Tree },
    // { id: 'safety', label: 'Safety', Icon: Shield },
  ];

  const sectorNavRef = useRef(null);



  useEffect(() => {
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
  }, []);

  const { wardData, categoryData, yearlyData } = useData();


  return (
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
  );
};

// Main Sector View Component
const SectorView = ({ sector }) => {
  const contentMap = {
    population: <PopulationContent category='population'/>,
    familyAndHousing: <PopulationContent category='family and household' />,
    health: <PopulationContent category='health' />,
    education: <PopulationContent category='education'/>,
    infrastructure: <DefaultContent sector="Infrastructure" />,
    transportation: <PopulationContent category="women and children" />,
    environment: <PopulationContent category="agriculture" />,
    social: <PopulationContent category="agriculture" />,
    safety: <DefaultContent sector="Safety" />,
    economy: <PopulationContent category='economy' />,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {contentMap[sector]}
    </div>
  );
};

const DetailedProfileSection = () => {
  // const {ward} = useWard()
  const [activeSector, setActiveSector] = useState('population')
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 pl-4">Theme Specific Profiles</h2>
      <SectorNavigation
        activeSector={activeSector}
        onSectorChange={setActiveSector}
      />
      <SectorView sector={activeSector} />
    </div>
  )
}

export default DetailedProfileSection;
