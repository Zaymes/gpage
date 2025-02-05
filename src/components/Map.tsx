'use client'
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useWard } from '@/app/ProfileContext';

// Define more specific types
interface WardProperties {
  wards: string;
}

interface GeoJSONData {
  type: string;
  features: Array<{
    type: string;
    properties: WardProperties;
    geometry: {
      type: string;
      coordinates: string; // You might want to make this more specific
    };
  }>;
}

interface MapClickHandlerProps {
  onMapClick: (e: L.LeafletMouseEvent) => void;
}

const MapClickHandler = ({ onMapClick }: MapClickHandlerProps) => {
  const map = useMap();
  
  useEffect(() => {
    map.on('click', onMapClick);
    return () => {
      map.off('click', onMapClick);
    };
  }, [map, onMapClick]);
  
  return null;
};

const Map = () => {
  const { setWard } = useWard();
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const layersRef = useRef<{ [key: string]: L.Layer }>({});
  const isZoomingRef = useRef(false);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch(`data/tulsipur_wards.geojson`);
        if (!response.ok) throw new Error('Failed to load GeoJSON');
        const data: GeoJSONData = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error('Error loading GeoJSON:', error);
      }
    };

    fetchGeoJSON();
  }, []);

  // Effect to maintain styles after zoom
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      
      const handleZoomStart = () => {
        isZoomingRef.current = true;
      };
      
      const handleZoomEnd = () => {
        isZoomingRef.current = false;
        if (selectedWard) {
          const layer = layersRef.current[selectedWard];
          if (layer && 'setStyle' in layer) {
            (layer as L.GeoJSON).setStyle({
              fillColor: '#00C897',
              weight: 3,
              color: '#333',
              fillOpacity: 0.9,
            });
          }
        }
      };

      map.on('zoomstart', handleZoomStart);
      map.on('zoomend', handleZoomEnd);

      return () => {
        map.off('zoomstart', handleZoomStart);
        map.off('zoomend', handleZoomEnd);
      };
    }
  }, [selectedWard]);

  const getWardStyle = (feature: GeoJSON.Feature<GeoJSON.Geometry, WardProperties>) => {
    const wardNumber = feature.properties.wards;
    
    if (selectedWard === wardNumber) {
      return {
        fillColor: '#00C897',
        weight: 3,
        color: '#333',
        fillOpacity: 1,
      };
    }
    
    return {
      fillColor: '#bfd1db',
      weight: 2,
      color: '#333',
      fillOpacity: 1,
    };
  };

  const highlightStyle = {
    fillColor: '#6CA6CD',
    weight: 3,
    color: '#000',
    fillOpacity: 0.9,
  };

  const resetAllLayersStyle = () => {
    if (geoJsonRef.current && !isZoomingRef.current) {
      geoJsonRef.current.setStyle((feature) => getWardStyle(feature as GeoJSON.Feature<GeoJSON.Geometry, WardProperties>));
    }
  };

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (isZoomingRef.current) return;
    
    const clickedPoint = e.latlng;
    let clickedWard: string | null = null;

    Object.entries(layersRef.current).forEach(([wardNumber, layer]) => {
      if ('getBounds' in layer && (layer as L.GeoJSON).getBounds().contains(clickedPoint)) {
        clickedWard = wardNumber;
      }
    });

    if (!clickedWard) {
      setSelectedWard(null);
      setWard('Municipal');
      resetAllLayersStyle();
      
      if (mapRef.current && geoData) {
        const allBounds = L.geoJSON(geoData).getBounds();
        mapRef.current.fitBounds(allBounds);
      }
    }
  };

  const onEachWard = (feature: GeoJSON.Feature<GeoJSON.Geometry, WardProperties>, layer: L.Layer) => {
    const wardNumber = feature.properties.wards;
    layersRef.current[wardNumber] = layer;
    
    const geoLayer = layer as L.GeoJSON & {
      bindTooltip: (tooltip: string, options?: L.TooltipOptions) => L.Layer;
      setStyle: (style: L.PathOptions) => L.Layer;
      getBounds: () => L.LatLngBounds;
    };
  
    geoLayer.bindTooltip(
      `<div class="ward-label">${wardNumber}</div>`,
      { permanent: true, direction: 'center', className: 'ward-tooltip' }
    );
  
    layer.on('mouseover', (e) => {
      if (isZoomingRef.current) return;
      const target = e.target as L.GeoJSON;
      if (selectedWard !== wardNumber) {
        target.setStyle(highlightStyle);
      }
    });

    layer.on('mouseout', (e) => {
      if (isZoomingRef.current) return;
      const target = e.target as L.GeoJSON;
      if (selectedWard !== wardNumber) {
        target.setStyle(getWardStyle(feature));
      }
    });
  
    layer.on('click', (e) => {
      if (isZoomingRef.current) return;
      L.DomEvent.stopPropagation(e);
      const target = e.target as L.GeoJSON;
      
      if (selectedWard === wardNumber) {
        setSelectedWard(null);
        setWard('Municipal');
        resetAllLayersStyle();
        
        if (mapRef.current && geoData) {
          const allBounds = L.geoJSON(geoData).getBounds();
          mapRef.current.fitBounds(allBounds);
        }
      } else {
        setSelectedWard(wardNumber);
        resetAllLayersStyle();
        
        if (mapRef.current) {
          const bounds = target.getBounds();
          mapRef.current.fitBounds(bounds, {
            padding: [50, 50],
          });
        }
        
        setWard(feature.properties);
      }
    });
  };

  return (
    <MapContainer
      center={[28.10654, 82.258307]}
      zoom={10.5}
      dragging={false}
      scrollWheelZoom={false}
      trackResize={true}
      doubleClickZoom={false}
      boxZoom
      style={{ backgroundColor: '#fff', marginTop: '4%', height: '60vh', width: '100%', maxHeight:'490px' }}
      ref={(map) => {
        if (map) {
          mapRef.current = map;
        }
      }}
    >
      <MapClickHandler onMapClick={handleMapClick} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        opacity={0.4}
        className='bg-slate-400'
      />
      {geoData && (
        <GeoJSON 
          ref={(layer) => {
            if (layer) {
              geoJsonRef.current = layer;
            }
          }}
          data={geoData} 
          style={getWardStyle} 
          onEachFeature={onEachWard}
        />
      )}
    </MapContainer>
  );
};

export default dynamic(() => Promise.resolve(Map), {
  ssr: false
});