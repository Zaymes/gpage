'use client';

import { DataProvider } from '@/contexts/DataContext';

export function Providers({ 
  children,
  data 
}: { 
  children: React.ReactNode;
  data: any; // Replace 'any' with your actual data type
}) {
  return (
    <DataProvider initialData={data}>
      {children}
    </DataProvider>
  );
}