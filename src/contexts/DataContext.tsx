// / src/contexts/DataContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DataContextType, WardIndicatorData, CategoryIndicatorData, YearlyIndicatorData, MainBannerData } from '../../types/data';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ 
  children,
  initialData
}: { 
  children: React.ReactNode;
  initialData: {
    wardData: WardIndicatorData[];
    categoryData: CategoryIndicatorData[];
    yearlyData: YearlyIndicatorData[];
    mainBannerData: MainBannerData[];
  }
}) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const value = {
    ...data,
    isLoading,
    error
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};