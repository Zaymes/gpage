'use client';

import { DataProvider } from '@/contexts/DataContext';

export function Providers({ 
  children,
  data 
}: { 
  children: React.ReactNode;
  data: {
    wardData: [];
    categoryData: [];
    yearlyData: [];
    mainBannerData: [];
  }; 
}) {
  return (
    <DataProvider initialData={data}>
      {children}
    </DataProvider>
  );
}