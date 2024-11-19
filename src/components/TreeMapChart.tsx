import React from 'react';
import { Tooltip, ResponsiveContainer, Treemap } from 'recharts';

interface TreeMapData {
  category: string;
  value: number;
}

interface TreeMapProps {
  data: TreeMapData[];
  title?: string;
  colors?: string[];
  aspectRatio?: number;
  minHeight?: number;
  valueFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
}

const RADIAN = Math.PI / 180;

const TreeMapChart: React.FC<TreeMapProps> = ({
  data,
  title = "TreeMap Visualization",
  colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#ffc658', '#ff8042'],
  aspectRatio = 4/3,
  minHeight = 400,
  valueFormatter = (value: number) => value.toLocaleString(),
  tooltipFormatter = (value: number) => value.toLocaleString()
}) => {
  const processedData = {
    name: 'root',
    children: data.map((item, index) => ({
      name: item.category,
      size: item.value,
      color: colors[index % colors.length],
      value: item.value
    }))
  };

  const CustomizedContent = (props: any) => {
    const { root, depth, x, y, width, height, name, value, color } = props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
          stroke="#fff"
          strokeWidth={2}
        />
        {width > 50 && height > 30 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 7}
              textAnchor="middle"
              fill="#fff"
              className="text-sm font-medium"
              style={{
                fontSize: '12px',
                fontFamily: 'sans-serif'
              }}
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 7}
              textAnchor="middle"
              fill="#fff"
              className="text-xs"
              style={{
                fontSize: '10px',
                fontFamily: 'sans-serif'
              }}
            >
              {valueFormatter(value)}
            </text>
          </>
        )}
      </g>
    );
  };

  return (
        <div style={{ width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%" aspect={aspectRatio}>
            <Treemap
              data={processedData.children}
              dataKey="size"
              aspectRatio={1}
              stroke="#fff"
              content={<CustomizedContent />}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 shadow-lg rounded-lg border">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm text-gray-600">
                          {tooltipFormatter(data.value)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </Treemap>
          </ResponsiveContainer>
        </div>
  );
};

export default TreeMapChart;