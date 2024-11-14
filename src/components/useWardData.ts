'use client'
// app/useWardData.ts
import { useState, useEffect } from 'react';

type WardData = {
  properties: {
    name: string;
  };
  value: number;
};

const useWardData = (): WardData[] | null => {
  const [wardData, setWardData] = useState<WardData[] | null>(null);

  useEffect(() => {
    // Fetch ward-level data from the API endpoint
    const fetchWardData = async () => {
      const response = await fetch('/api/ward-data');
      const data = await response.json();
      setWardData(data);
    };
    fetchWardData();
  }, []);

  return wardData;
};

export default useWardData;