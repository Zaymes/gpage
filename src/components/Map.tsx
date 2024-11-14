import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet for direct operations on layers
import 'leaflet/dist/leaflet.css';
import '../styles/globals.css'; // Your global CSS

const Map = ({ onWardSelect }) => {
  const [geoData, setGeoData] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null); // Track the selected ward
  const [zoomedWard, setZoomedWard] = useState(null); // Track the zoomed ward
  const mapRef = useRef(null); // Reference to the map instance

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch(`data/tulsipur_wards.geojson`);
        if (!response.ok) throw new Error('Failed to load GeoJSON');

        const data = await response.json();
        setGeoData(data);

        // Fit map to GeoJSON bounds when data is loaded
        if (mapRef.current) {
          const layer = new L.GeoJSON(data);
          mapRef.current.fitBounds(layer.getBounds());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGeoJSON();
  }, []);

  const wardStyle = (feature) => ({
    fillColor: '#A3C1D0',
    weight: 2,
    color: '#333',
    fillOpacity: 0.7,
  });

  const highlightStyle = {
    fillColor: '#6CA6CD',
    weight: 3,
    color: '#000',
    fillOpacity: 0.9,
  };

  const activeStyle = {
    fillColor: '#00C897',
    weight: 3,
    color: '#333',
    fillOpacity: 0.9,
  };

  const onEachWard = (feature, layer) => {
    const wardNumber = feature.properties.wards;
  
    layer.bindTooltip(
      `<div class="ward-label">${wardNumber}</div>`,
      { permanent: true, direction: 'center', className: 'ward-tooltip' }
    );
  
    layer.on('mouseover', (e) => {
      if (selectedWard !== layer) {
        e.target.setStyle(highlightStyle);
      }
    });
    layer.on('mouseout', (e) => {
      if (selectedWard !== layer && zoomedWard !== layer) {
        e.target.setStyle(wardStyle(feature));
      }
    });
  
    layer.on('click', () => {
      if (selectedWard === layer) {
        // Clicked the same ward, revert to original size
        setSelectedWard(null);
        setZoomedWard(null);
        if (mapRef.current) {
          mapRef.current.fitBounds(layer.getBounds());
        }
      } else {
        // Clicked a different ward, zoom in
        if (selectedWard) {
          selectedWard.setStyle(wardStyle(selectedWard.feature));
        }
        layer.setStyle(activeStyle);
        setSelectedWard(layer);
        setZoomedWard(layer);
  
        // Fit map to the clicked ward's bounds
        if (mapRef.current) {
          const bounds = layer.getBounds();
          mapRef.current.fitBounds(bounds, {
            padding: [50, 50], // Add some padding around the zoomed ward
          });
        }
      }
  
      onWardSelect(feature.properties);
    });
  };

  return (
    <MapContainer
      center={[28.131213, 82.298307]} // Fallback center
      zoom={11.4}
      style={{ backgroundColor: 'white', marginTop: '4%', height: '80vh', width: '100%' }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)} // Assign map instance
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoData && (
        <GeoJSON data={geoData} style={wardStyle} onEachFeature={onEachWard} />
      )}
    </MapContainer>
  );
};

export default Map;