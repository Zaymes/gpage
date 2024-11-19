
"use client"
import React, { useState, useEffect, useRef, useContext } from 'react';
import dynamic from 'next/dynamic';
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
  HousePlus
} from "lucide-react";

import { PopulationContent, HealthContent, EducationContent, DefaultContent } from '../Charts';
import {WardContext} from '../../app/page'
import {useWard} from '../../app/ProfileContext'

// Navigation Component

const SectorNavigation = ({ activeSector, onSectorChange }) => {
  // Navigation items configuration
  const sectorNavItems = [
    { id: 'population', label: 'Population', Icon: Users },
    { id: 'familyAndHousing', label: 'Family and Housing', Icon: HousePlus },
    { id: 'Social Structure', label: 'Social Structure', Icon: Handshake },
    { id: 'health', label: 'Healthcare', Icon: HeartPulse },
    { id: 'education', label: 'Education', Icon: GraduationCap },
    { id: 'infrastructure', label: 'Infrastructure', Icon: Building2 },
    { id: 'transportation', label: 'Transportation', Icon: Bus },
    // { id: 'environment', label: 'Agricutlure and Environment', Icon: Tree },
    // { id: 'safety', label: 'Safety', Icon: Shield },
    { id: 'economy', label: 'Economy', Icon: Briefcase },
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
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// Main Sector View Component
const SectorView = ({ sector }) => {
  const contentMap = {
    population: <PopulationContent />,
    health: <HealthContent />,
    education: <EducationContent />,
    infrastructure: <DefaultContent sector="Infrastructure" />,
    transportation: <DefaultContent sector="Transportation" />,
    environment: <DefaultContent sector="Environment" />,
    safety: <DefaultContent sector="Safety" />,
    economy: <DefaultContent sector="Economy" />,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {contentMap[sector]}
    </div>
  );
};

const DetailedProfileSection = () => {
  const {ward} = useWard()
  console.log('FROM SeC Section', ward)
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
