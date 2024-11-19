import React, { useMemo, useEffect, useRef, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import DataCard from './DataCard';

// Selector Component
const IndicatorSelector = ({ indicators, selectedIndicator, onSelectIndicator }) => {
  return (
    <div className="mb-4">
      <select
        value={selectedIndicator}
        onChange={(e) => onSelectIndicator(e.target.value)}
        className="w-[250px] p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {indicators.map((indicator) => (
          <option key={indicator} value={indicator}>
            {indicator}
          </option>
        ))}
      </select>
    </div>
  );
};

// Legend Component
const MapLegend = ({ minValue, maxValue, colorScale }) => {
  return (
    <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow-lg">
      <div className="text-sm font-bold mb-2">Value Range</div>
      <div className="flex items-center space-x-2">
        <div 
          className="w-24 h-4 block" 
          style={{
            background: `linear-gradient(to right, ${colorScale(minValue, minValue, maxValue)}, ${colorScale(maxValue, minValue, maxValue)})`
          }}
        />
        <div className="flex justify-between w-full text-xs">
          <span>{Math.floor(minValue).toLocaleString()}</span>
          <span>{Math.ceil(maxValue).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

// Main Map Component
const ChoroplethMap = ({ geoJson, data, selectedIndicator, colorScale, minValue, maxValue }) => {
  const mapRef = useRef(null);
  
  const onEachFeature = useMemo(
    () => (feature, layer) => {
      const datum = data.find(
        (d) => d.ward.toLowerCase() === feature.properties.locallevel_name.toLowerCase()
      );
      const value = datum ? Number(datum[selectedIndicator]) : 0;

      const tooltipContent = `
        <div class="font-sans p-2">
          <div class="font-bold">${feature.properties.locallevel_name}</div>
          <div>${selectedIndicator}: ${value.toLocaleString()}</div>
        </div>
      `;

      layer.on({
        mouseover: () => {
          layer.setStyle({ fillOpacity: 0.9, weight: 2 });
          layer.bindTooltip(tooltipContent, {
            permanent: false,
            direction: 'auto',
            className: 'custom-tooltip'
          }).openTooltip();
        },
        mouseout: () => {
          layer.setStyle({ fillOpacity: 0.7, weight: 1 });
          layer.closeTooltip();
        },
        click: () => {
          if (mapRef.current) {
            mapRef.current.fitBounds(layer.getBounds());
          }
        }
      });

      layer.setStyle({
        fillColor: colorScale(value, minValue, maxValue),
        fillOpacity: 0.7,
        color: 'white',
        weight: 1
      });
    },
    [data, selectedIndicator, colorScale, minValue, maxValue]
  );

  useEffect(() => {
    if (mapRef.current) {
      const bounds = L.geoJSON(geoJson).getBounds();
      mapRef.current.fitBounds(bounds);
    }
  }, [geoJson]);

  const mapOptions = {
    zoomControl: true,
    dragging: false,
    touchZoom: true,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
  };

  return (
    <MapContainer
      center={[28.100213, 82.298307]}
      zoom={11.45}
      className="bg-white h-[80vh] w-full max-w-[500px]"
      {...mapOptions}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <GeoJSON data={geoJson} onEachFeature={onEachFeature} />
      <MapLegend minValue={minValue} maxValue={maxValue} colorScale={colorScale} />
    </MapContainer>
  );
};

// Main Component
const ChoroplethComponent = ({ geoJson, data, dataCardData }) => {
  // Get all available indicators (columns) from the first data entry
  const indicators = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).filter(key => key !== 'ward');
  }, [data]);

  const [selectedIndicator, setSelectedIndicator] = useState(indicators[0] || 'जम्मा जनसङ्ख्या');

  const colorScale = (value, minValue, maxValue) => {
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    const r = Math.round(220 * (1 - normalizedValue));
    const g = Math.round(235 * (1 - normalizedValue));
    const b = Math.round(255 * (1 - normalizedValue * 0.5));
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  };

  const { minValue, maxValue } = useMemo(() => {
    const values = data
      .map(d => Number(d[selectedIndicator]))
      .filter(v => !isNaN(v));
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values)
    };
  }, [data, selectedIndicator]);

  return (
    <div className="relative text-black bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow mt-12 border-2">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-black mb-4">Population Distribution Across Wards</h3>
        <IndicatorSelector
          indicators={indicators}
          selectedIndicator={selectedIndicator}
          onSelectIndicator={setSelectedIndicator}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 content-start gap-4">
        <div className="md:col-span-2">
          <ChoroplethMap
            geoJson={geoJson}
            data={data}
            selectedIndicator={selectedIndicator}
            colorScale={colorScale}
            minValue={minValue}
            maxValue={maxValue}
          />
        </div>
        <div className="md:col-span-3 grid md:grid-cols-3 gap-4 content-evenly">
          {dataCardData.map((data, index) => (
            <div key={index} className="col-span-1">
              <DataCard
                key={index}
                icon={data.icon}
                name={data.name}
                value={data.value}
                source={data.source}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChoroplethComponent;