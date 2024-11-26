import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, Text } from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from './ui/PiCard';  // Update this import path as needed
import InfoDisplay from './StatsDescription'

const CustomPieChart = ({
  data = [],
  title = 'Pie Chart',
  caption,
  colors = ['#6ABDE7', 'gray', '#B0C3E8', '#4B6A9D', '#8C9FC2'],
  innerRadius = 0,
  outerRadius = "80%",
  dataKey = "value",
  nameKey = "name",
  showLegend = true,
  showTooltip = true,
  showLabels = true,
  className = ""
}) => {
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (!showLabels) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  return (
    <div className='grid grid-cols-2 mb-8'>
      <div className='h-48 col-span-1'>
      <p className='text-gray-400 text-md'>{title}</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                dataKey={dataKey}
                nameKey={nameKey}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]}
                    // opacity={0.6}
                  />
                ))}
              </Pie>
              {showTooltip && <Tooltip />}
              {showLegend && (
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                />
              )}
            </PieChart>
          </ResponsiveContainer>
          </div>
          <div className='col-span-1'>
          <div className="md:col-span-1 my-auto">
            {/* TODO: add the grid here in right of the section the caption will be loaded */}
            <InfoDisplay info={caption}  />
          </div>
          </div>
    </div>
  );
};

export default CustomPieChart;