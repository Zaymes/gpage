'use client'
import ChoroplethComponent from "./ChoroplethComponent";
import useWardGeoJson from "./useWardGeoJson";
import useWardData from "./useWardData";
import { dataCardData } from "./data";

const ChloroplethMap: React.FC = () => {
  const wardGeoJson = useWardGeoJson();
  const wardData = useWardData();

  return (
    <div>
      {wardGeoJson && wardData && (
        <ChoroplethComp onent
          geoJson={wardGeoJson}
          data={wardData}
          dataCardData={dataCardData}
          // colorScale={(value, minValue, maxValue) => {
          //   // Example of how the values are used in the color calculation
          //   const normalizedValue = (value - minValue) / (maxValue - minValue);
          //   const intensity = Math.floor(128 * normalizedValue);
          //   const baseColor = 255 - intensity;
          //   return `rgba(${baseColor}, ${baseColor}, 255, 0.8)`;
          // }}
        />
      )}
    </div>
  );
};

export default ChloroplethMap;