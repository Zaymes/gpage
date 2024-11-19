import React from 'react';

interface Info {
  number: number | string;
  indicator: string;
  description: string;
  source: string;
}

interface InfoDisplayProps {
  info: Info;
}

const InfoDisplay = ({ info }: InfoDisplayProps): JSX.Element => {
  const { number, indicator, description, source } = info;
  
  return (
    <div className="text-black">
      <p className="text-md mb-4">
        <span className="font-bold text-2xl">{number}</span> {indicator}
      </p>
      <p className="text-sm mb-4">{description}</p>
      <p className="italic text-sm text-cyan-900">{source}</p>
    </div>
  );
};

export default InfoDisplay;
