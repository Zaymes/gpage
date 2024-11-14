// app/useWardGeoJson.ts
import { useState, useEffect } from 'react';
import { readGeoJson } from '../utils/readGeoJson';

const useWardGeoJson = () => {
  const [wardGeoJson, setWardGeoJson] = useState<any>(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
        try {
          const response = await fetch(`data/tulsipur_wards.geojson`);
          if (!response.ok) throw new Error('Failed to load GeoJSON');
  
          const data = await response.json();
          setWardGeoJson(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchGeoJSON();
  }, []);

  return wardGeoJson;
};

export default useWardGeoJson;