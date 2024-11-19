'use client'
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useWard } from '@/app/ProfileContext';

interface WardProperties {
  wards: string;
}

const MapClickHandler = ({ onMapClick }: { onMapClick: (e: L.LeafletMouseEvent) => void }) => {
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
  const [geoData, setGeoData] = useState<any>(null);
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
        const data = await response.json();
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
            (layer as any).setStyle({
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
        fillOpacity: 0.9,
      };
    }
    
    return {
      fillColor: '#bfd1db',
      weight: 2,
      color: '#333',
      fillOpacity: 0.4,
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
    let clickedWard = null;

    Object.entries(layersRef.current).forEach(([wardNumber, layer]: [string, any]) => {
      if (layer.getBounds && layer.getBounds().contains(clickedPoint)) {
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
    
    const layerWithMethods = layer as L.Layer & {
      bindTooltip: Function;
      setStyle: Function;
      getBounds: Function;
    };
  
    layerWithMethods.bindTooltip(
      `<div class="ward-label">${wardNumber}</div>`,
      { permanent: true, direction: 'center', className: 'ward-tooltip' }
    );
  
    layer.on('mouseover', (e) => {
      if (isZoomingRef.current) return;
      const target = e.target as typeof layerWithMethods;
      if (selectedWard !== wardNumber) {
        target.setStyle(highlightStyle);
      }
    });

    layer.on('mouseout', (e) => {
      if (isZoomingRef.current) return;
      const target = e.target as typeof layerWithMethods;
      if (selectedWard !== wardNumber) {
        target.setStyle(getWardStyle(feature));
      }
    });
  
    layer.on('click', (e) => {
      if (isZoomingRef.current) return;
      L.DomEvent.stopPropagation(e);
      const target = e.target as typeof layerWithMethods;
      
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
      center={[28.101213, 82.298307]}
      zoom={11.45}
      dragging={false}
      scrollWheelZoom={false}
      trackResize={true}
      doubleClickZoom={false}
      boxZoom
      style={{ backgroundColor: '#fff', marginTop: '4%', height: '64vh', width: '100%' }}
      ref={(map) => {
        if (map) {
          mapRef.current = map;
        }
      }}
    >
      <MapClickHandler onMapClick={handleMapClick} />
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

export default Map;