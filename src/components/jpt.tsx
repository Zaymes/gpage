
// // 

// import { useEffect, useState, useRef } from 'react';
// import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useWard } from '@/app/ProfileContext';

// const MapClickHandler = ({ onMapClick }) => {
//   const map = useMap();
  
//   useEffect(() => {
//     const handleClick = (e) => {
//       onMapClick(e);
//     };
    
//     map.on('click', handleClick);
    
//     return () => {
//       map.off('click', handleClick);
//     };
//   }, [map, onMapClick]);
  
//   return null;
// };

// const Map = () => {
//   const {setWard} = useWard()
//   const [geoData, setGeoData] = useState(null);
//   const [selectedWard, setSelectedWard] = useState(null);
//   const [zoomedWard, setZoomedWard] = useState(null);
//   const mapRef = useRef(null);
//   const layersRef = useRef({}); // Using a plain object instead of Map

//   useEffect(() => {
//     const fetchGeoJSON = async () => {
//       try {
//         const response = await fetch(`data/tulsipur_wards.geojson`);
//         if (!response.ok) throw new Error('Failed to load GeoJSON');

//         const data = await response.json();
//         setGeoData(data);

//         if (mapRef.current) {
//           const layer = new L.GeoJSON(data);
//           mapRef.current.fitBounds(layer.getBounds());
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchGeoJSON();
//   }, []);

//   const wardStyle = (feature) => ({
//     fillColor: '#bfd1db',
//     weight: 2,
//     color: '#333',
//     fillOpacity: 0.4,
//   });

//   const highlightStyle = {
//     fillColor: '#6CA6CD',
//     weight: 3,
//     color: '#000',
//     fillOpacity: 0.9,
//   };

//   const activeStyle = {
//     fillColor: '#00C897',
//     weight: 3,
//     color: '#333',
//     fillOpacity: 0.9,
//   };

//   // Reset all layers to default style
//   const resetAllLayersStyle = () => {
//     Object.values(layersRef.current).forEach((layer) => {
//       layer.setStyle(wardStyle(layer.feature));
//     });
//   };

//   // Handle clicks anywhere on the map
//   const handleMapClick = (e) => {
//     const clickedPoint = e.latlng;
//     let clickedWard = null;

//     Object.values(layersRef.current).forEach((layer) => {
//       if (layer.getBounds().contains(clickedPoint)) {
//         clickedWard = layer;
//       }
//     });

//     if (!clickedWard) {
//       // Clicked outside any ward
//       resetAllLayersStyle();
//       setSelectedWard(null);
//       setZoomedWard(null);
//       setWard('Municipal');
      
//       // Reset map view to show all wards
//       if (mapRef.current && geoData) {
//         const allBounds = new L.GeoJSON(geoData).getBounds();
//         mapRef.current.fitBounds(allBounds);
//       }
//     }
//   };

//   const onEachWard = (feature, layer) => {
//     const wardNumber = feature.properties.wards;
    
//     // Store the layer reference in our object
//     layersRef.current[wardNumber] = layer;
  
//     layer.bindTooltip(
//       `<div class="ward-label">${wardNumber}</div>`,
//       { permanent: true, direction: 'center', className: 'ward-tooltip' }
//     );
  
//     layer.on('mouseover', (e) => {
//       if (selectedWard !== layer) {
//         e.target.setStyle(highlightStyle);
//       }
//     });

//     layer.on('mouseout', (e) => {
//       if (selectedWard !== layer && zoomedWard !== layer) {
//         e.target.setStyle(wardStyle(feature));
//       }
//     });
  
//     layer.on('click', (e) => {
//       // Stop event propagation to prevent the map click handler from firing
//       L.DomEvent.stopPropagation(e);
      
//       if (selectedWard === layer) {
//         resetAllLayersStyle();
//         setSelectedWard(null);
//         setZoomedWard(null);
//         setWard('Municipal');
        
//         if (mapRef.current && geoData) {
//           const allBounds = new L.GeoJSON(geoData).getBounds();
//           mapRef.current.fitBounds(allBounds);
//         }
//       } else {
//         resetAllLayersStyle();
//         layer.setStyle(activeStyle);
//         setSelectedWard(layer);
//         setZoomedWard(layer);
//         console.log('YO VENA')
        
  
//         if (mapRef.current) {
//           const bounds = layer.getBounds();
//           mapRef.current.fitBounds(bounds, {
//             padding: [50, 50],
//           });
//         }
        
//         setWard(feature.properties);
//       }
//     });
//   };

//   return (
//     <MapContainer
//       center={[28.101213, 82.298307]}
//       zoom={11.45}
//       dragging={false}
//       scrollWheelZoom={false}
//       trackResize={true}
//       doubleClickZoom={false}
//       boxZoom
//       style={{ backgroundColor: '#fff', marginTop: '4%', height: '64vh', width: '100%' }}
//       whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
//     >
//       <MapClickHandler onMapClick={handleMapClick} />
//       {geoData && (
//         <GeoJSON 
//           data={geoData} 
//           style={wardStyle} 
//           onEachFeature={onEachWard}
//         />
//       )}
//     </MapContainer>
//   );
// };

// export default Map;
