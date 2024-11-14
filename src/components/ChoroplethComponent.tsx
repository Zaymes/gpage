'use client'
import React, { useMemo, useEffect, useRef } from 'react';
import { MapContainer, GeoJSON, Tooltip } from 'react-leaflet';
import L from 'leaflet';

type ChoroplethComponentProps = {
  geoJson: any;
  data: Array<{ ward: string;[key: string]: number | string }>;
  colorScale?: (value: number, minValue: number, maxValue: number) => string;
};

const ChoroplethComponent: React.FC<ChoroplethComponentProps> = ({
  geoJson,
  data,
  colorScale = (value, minValue, maxValue) => {
    // Normalize the value between 0 and 1
    const normalizedValue = (value - minValue) / (maxValue - minValue);

    // Use a more visually appealing color scale
    // From light blue to dark blue
    const r = Math.round(220 * (1 - normalizedValue));
    const g = Math.round(235 * (1 - normalizedValue));
    const b = Math.round(255 * (1 - normalizedValue * 0.5));

    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  },
}) => {
  const mapRef = useRef<L.Map>(null);

  // Calculate min and max values for the dataset
  const { minValue, maxValue } = useMemo(() => {
    const values = data.map(d => Number(d['जम्मा जनसङ्ख्या'])).filter(v => !isNaN(v));
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values)
    };
  }, [data]);

  useEffect(() => {
    if (mapRef.current) {
      const bounds = L.geoJSON(geoJson).getBounds();
      mapRef.current.fitBounds(bounds);
    }
  }, [geoJson]);

  const onEachFeature = useMemo(
    () => (feature: any, layer: L.Polygon) => {
      const datum = data.find(
        (d) => d.ward.toLowerCase() === feature.properties.locallevel_name.toLowerCase()
      );
      const value = datum ? Number(datum['जम्मा जनसङ्ख्या']) : 0;

      // Create tooltip content with formatted number
      const tooltipContent = `
        <div class="font-sans p-2">
          <div class="font-bold">${feature.properties.locallevel_name}</div>
          <div>जम्मा जनसङ्ख्या: ${value.toLocaleString()}</div>
        </div>
      `;

      layer.on({
        mouseover: (e) => {
          layer.setStyle({
            fillOpacity: 0.9,
            weight: 2
          });
          layer.bindTooltip(tooltipContent, {
            permanent: false,
            direction: 'auto',
            className: 'custom-tooltip'
          }).openTooltip();
        },
        mouseout: (e) => {
          layer.setStyle({
            fillOpacity: 0.7,
            weight: 1
          });
          layer.closeTooltip();
        },
        click: (e) => {
          if (mapRef.current) {
            mapRef.current.fitBounds(layer.getBounds());
          }
        }
      });

      // Set initial style with dynamic color based on normalized value
      layer.setStyle({
        fillColor: colorScale(value, minValue, maxValue),
        fillOpacity: 1,
        color: 'white',
        weight: 1
      });
    },
    [data, colorScale, minValue, maxValue]
  );

  const mapOptions = {
    zoomControl: false,      // Removes zoom buttons
    dragging: false,         // Disables map dragging
    touchZoom: false,        // Disables touch zoom
    scrollWheelZoom: false,  // Disables scroll wheel zoom
    doubleClickZoom: false,  // Disables double click zoom
    boxZoom: false,          // Disables box zoom
    keyboard: false,         // Disables keyboard controls
  };

  return (
    <div className="relative text-black bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow mt-12">
      <h3 className="text-xl font-semibold text-black">Population Distribution Across Wards</h3>
      <MapContainer
        center={[28.100213, 82.298307]}
        zoom={11.45}
        className="bg-white h-[80vh] w-full max-w-[500px]"
        {...mapOptions}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <GeoJSON data={geoJson} onEachFeature={onEachFeature} />
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow-lg ">
        <div className="text-sm font-bold mb-2">जम्मा जनसङ्ख्या</div>
        <div className="flex items-center space-x-2">
          <div className="w-24 h-4 bg-gradient-to-r from-[rgb(220,235,255)] to-[rgb(0,0,128)] block" />
          <div className="flex justify-between w-full text-xs">
            <span>{Math.floor(minValue).toLocaleString()}</span>
            <span>{Math.ceil(maxValue).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoroplethComponent;