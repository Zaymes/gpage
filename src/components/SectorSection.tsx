
"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Population,
  HeartPulse,
  GraduationCap,
  Building2,
  Bus,
  Tree,
  Shield,
  Briefcase
} from "lucide-react";

import { PopulationContent, HealthContent, EducationContent, DefaultContent } from './AllWards';

// Navigation Component
const SectorNavigation = ({ activeSector, onSectorChange }) => {
  // Navigation items configuration
  const sectorNavItems = [
    { id: 'population', label: 'Population', Icon: Population },
    { id: 'health', label: 'Healthcare', Icon: HeartPulse },
    { id: 'education', label: 'Education', Icon: GraduationCap },
    { id: 'infrastructure', label: 'Infrastructure', Icon: Building2 },
    { id: 'transportation', label: 'Transportation', Icon: Bus },
    { id: 'environment', label: 'Environment', Icon: Tree },
    { id: 'safety', label: 'Safety', Icon: Shield },
    { id: 'economy', label: 'Economy', Icon: Briefcase },
  ];
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-sm">
      {sectorNavItems.map((item) => {
        const IconComponent = item.Icon;  // Create a reference to the icon component
        return (
          <button
            key={item.id}
            onClick={() => onSectorChange(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
              ${activeSector === item.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {/* <IconComponent className="w-4 h-4" />  Use the icon component reference */}
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
  const [activeSector, setActiveSector] = useState('population')
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 pl-4">Sector Specific Profiles</h2>
      <SectorNavigation
        activeSector={activeSector}
        onSectorChange={setActiveSector}
      />
      <SectorView sector={activeSector} />
    </div>
  )
}

export default DetailedProfileSection;
