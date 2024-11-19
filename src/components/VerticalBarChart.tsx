import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList
} from 'recharts';

interface BarChartProps {
  data: Array<Record<string, any>>;
  title?: string;
  xAxisKey?: string;
  yAxisKey?: string;
  barColor?: string;
  height?: number;
  width?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
  barSize?: number;
  maxBarWidth?: number;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  secondBar?: string;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

const CustomBarChart: React.FC<BarChartProps> = ({
  data,
  title = 'Bar Chart',
  xAxisKey = 'category',
  yAxisKey = 'value',
  secondBar = '',
  barColor = '#3b82f6',
  height = '200',
  width = '100%',
  xAxisLabel = '',
  yAxisLabel = '',
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  className = '',
  barSize = 20,
  maxBarWidth = 100,
  hideXAxis = false,
  hideYAxis = false,
  margin = { top: 0, right: 20, left: 8, bottom: 20 }
}) => {
  return (
    <div className={`w-full ${className} border-2`}>
      {/* Title */}
      {title && (
        <h2 className="text-lg font-semibold mb-2 text-slate-800 px-4 mt-4">
          Wardwise Population by Sex
        </h2>
      )}

      {/* Chart Container */}
      <div className="w-full" style={{ height: `374px` }}>
        <ResponsiveContainer width={width} height="100%">
          <BarChart
            data={data}
            margin={margin}
            layout='horizontal'
            barGap={40}
          >
            {/* Optional Grid */}
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-gray-200"
              />
            )}

            {/* X-Axis */}
            {!hideXAxis && (
              <XAxis
                dataKey={xAxisKey}
                className="text-sm fill-gray-600"
                tick={{ fontSize: 12 }}
              >
                {xAxisLabel && (
                  <Label
                    value={xAxisLabel}
                    position="bottom"
                    offset={-20}
                    className="text-sm fill-gray-600"
                  />
                )}
              </XAxis>
            )}

            {/* Y-Axis */}
            {!hideYAxis && (
              <YAxis
                className="text-sm fill-gray-600"
                tick={{ fontSize: 12 }}
              >
                {yAxisLabel && (
                  <Label
                    value={yAxisLabel}
                    angle={-90}
                    position="left"
                    offset={-25}
                    className="text-sm fill-gray-600"
                  />
                )}
              </YAxis>
            )}

            {/* Optional Tooltip */}
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '8px'
                }}
                cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              />
            )}

            {/* Optional Legend */}
            {showLegend && (
              <Legend
                verticalAlign="top"
                height={36}
                className="text-sm"
              />
            )}

            {/* Bar */}
            <Bar
              dataKey={yAxisKey}
              // fill='#6abde7'
              fill='#6ABDE7'
              barSize={barSize}
              stackId={1}
              // opacity={0.7}
              maxBarSize={maxBarWidth}
              radius={[0, 0, 0, 0]} // Rounded top corners
              className=" transition-opacity duration-200"
            >
              <LabelList dataKey={yAxisKey} position="insideTop" className='text-xs text-black' offset={20} angle={-90} fill='#000' />
            </Bar>
            {
              secondBar !=="" ? 
              <Bar
              dataKey={secondBar}
              // fill='#D71A60'
              // fill='#2463EB'
              fill='gray'
              stackId={2}
              opacity={0.6}
              barSize={barSize}
              maxBarSize={maxBarWidth}
              radius={[0,0, 0, 0]} // Rounded top corners
              className=" transition-opacity duration-200"
            >
              <LabelList dataKey={secondBar} position="insideTop" className='text-xs text-black' offset={20} angle={-90}  fill='#000' />
            </Bar>:
            null
            }

          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-blue-500 ml-4 mb-4">
        <a 
          href={''}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Source: {'Central Bureau Of Statistics'}
        </a>
      </div>
    </div>
  );
};

export default CustomBarChart;