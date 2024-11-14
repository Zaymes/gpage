// 'use client'
// // ChloroplethMap.tsx
// import React from 'react';
// import useWardGeoJson from './useWardGeoJson';
// import useWardData from './useWardData';
// import ChoroplethComponent from './ChoroplethComponent';

// const ChloroplethMap: React.FC = () => {
//   const wardGeoJson = useWardGeoJson();
//   const wardData = useWardData();

//   return (
//     <div>
//       {wardGeoJson && wardData && (
//         <ChoroplethComponent
//           geoJson={wardGeoJson}
//           data={wardData}
//           colorScale={(value) => `rgba(${255 - 128 * value / 100}, ${255 - 128 * value / 100}, 255, 0.8)`}
//         />
//       )}
//     </div>
//   );
// };

// export default ChloroplethMap;