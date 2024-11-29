// components/InfoPanel.js
// import styles from '../styles/globals.css'; // Style accordingly
import React, { useState } from 'react';
import { LandPlot, PersonStanding, HandCoins, Accessibility, University, Users, Briefcase, HeartPulse, GraduationCap, Home, Bus, Trees, Shield, Lightbulb } from "lucide-react";
import { useData } from '@/contexts/DataContext';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { colors } from './data';
import LanguageSwitch from './LanguageSwitcher';



const indicator_icon_mapping = {
  area: LandPlot,
  population: Users,
  gender_ratio: PersonStanding,
  number_of_families: Home,
  total_schools: University,
  healthcare_facilities: HeartPulse,
  literacy_rate: GraduationCap,
  disability_rate: Accessibility,
  poverty_rate: HandCoins

}


const InfoCard = ({ subtitle, value, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-start mb-2">
        {Icon && <Icon className="h-10 w-10 text-gray-700 mr-4" />}
        <div>
          {/* <h3 className="text-sm font-medium text-gray-700">{title}</h3> */}
          <div className="text-2xl font-bold text-cyan-500 mb-1" style={{ color: '#6ABDE7' }}>{value}</div>
          <p className="text-sm text-gray-700 mb-2">{subtitle}</p>
        </div>

      </div>
    </div>
  );
};

// InfoPanel Component
const InfoPanel = ({ wardNumber }) => {
  const t = useTranslations()
  const locale = useLocale()
  const { mainBannerData, isLoading, error } = useData()
  const selectedWard = wardNumber === "municipal" ? 'All Wards' : wardNumber.wards;
  // console.log('Type', typeof (selectedWard), selectedWard)

  if (isLoading) return <div>{t('common.loading')}</div>;
  if (error) return <div>{t('common.error', { message: error.message })}</div>;

  return (
    <div className="p-4">
      <div className='flex justify-end'>
        <p className='text-sm my-auto'>{t('common.language')}</p>
        <LanguageSwitch />
      </div>
      <h2 className="text-3xl font-bold mb-4 text-gray-800 mb-4">{t('common.main_heading')}</h2>
      {/* Todo make a translation here and proper content */}
      <h3 className="text-2xl font-normal mb-4 text-gray-700 mb-4">{selectedWard === "All Wards" ? "Municipal Overview" : <p>{selectedWard}</p>}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mainBannerData.filter((item) => String(item.ward_number) === String(selectedWard)).map((item, index) => (
          <div key={index}>
            {locale === "ne" ?
              <InfoCard
                key={index}
                // title={item.title}
                subtitle={item.indicator_name_ne}
                value={item.indicator_value_ne}
                icon={indicator_icon_mapping[item.indicator_code]}
              /> :
              <InfoCard
                key={index}
                // title={item.title}
                subtitle={item.indicator_name_en}
                value={item.indicator_value_en}
                icon={indicator_icon_mapping[item.indicator_code]}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoPanel;
