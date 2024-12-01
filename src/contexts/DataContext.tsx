// / src/contexts/DataContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, _setData] = useState(initialData);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, _setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, _setError] = useState<Error | null>(null);

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