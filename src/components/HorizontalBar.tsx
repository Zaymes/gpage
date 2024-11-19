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

interface HorizontalBarChartProps {
  data: Array<Record<string, any>>;
  title?: string;
  xAxisKey?: string;
  yAxisKey?: string;
  xAxisKey2?: string;
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
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  tickFormatter?: (value: any) => string;
  valuePrefix?: string;
  valueSuffix?: string;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  title = 'Horizontal Bar Chart',
  xAxisKey = 'value',
  yAxisKey = 'name',
  xAxisKey2 = '',
  barColor = '#6ABDE7',
  height = 350,
  width = '100%',
  xAxisLabel = '',
  yAxisLabel = '',
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  className = '',
  barSize = 20,
  maxBarWidth = 32,
  hideXAxis = false,
  hideYAxis = false,
  margin = { top: 20, right: 20, bottom: 20 },
  tickFormatter,
  valuePrefix = '',
  valueSuffix = ''
}) => {
  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            {valuePrefix}
            {tickFormatter ? tickFormatter(payload[0].value) : payload[0].value}
            {valueSuffix}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Title */}
      {/* {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-800 px-4">
          {title}
        </h2>
      )} */}

      {/* Chart Container */}
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width={width} height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={margin}
            barSize={20}
          >
            {/* Optional Grid */}
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-gray-200"
                horizontal={false}
              />
            )}

            {/* X-Axis (now showing values) */}
            {!hideXAxis && (
              <XAxis
                type="number"
                className="text-sm fill-gray-600"
                tick={{ fontSize: 12 }}
                interval={0}
                tickFormatter={tickFormatter}
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

            {/* Y-Axis (now showing categories) */}
            {!hideYAxis && (
              <YAxis
                type="category"
                dataKey={yAxisKey}
                className="text-sm fill-gray-600"
                tick={{ fontSize: 12 }}
                interval={0}
                width={80}
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
                // content={<CustomTooltip />}
                cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              />
            )}

            {/* Optional Legend */}
            {showLegend && (
              <Legend
                verticalAlign="middle"
                align='right'
                layout='vertical'
                height={36}
                className="text-sm"
              />
            )}

            {/* Bar */}
            <Bar
              dataKey={xAxisKey}
              fill='#6ABDE7'
              barSize={barSize}
              maxBarSize={maxBarWidth}
              //   radius={[0, 4, 4, 0]} // Rounded right corners
              className="hover:opacity-80 transition-opacity duration-200"
            >
              {/* <LabelList dataKey={xAxisKey} position="insideRight" className='text-xs text-black' offset={-40} fill='#000' /> */}
            </Bar>
            {xAxisKey2 ?
              <Bar
                dataKey={xAxisKey2}
                fill='gray'
                barSize={barSize}
                maxBarSize={maxBarWidth}
                opacity={0.6}
                //   radius={[0, 4, 4, 0]} // Rounded right corners
                className="hover:opacity-80 transition-opacity duration-200"
              >
                {/* <LabelList dataKey={xAxisKey2} position="insideRight" className='text-xs text-black' fill='#000' /> */}
              </Bar>
              :
              null}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HorizontalBarChart;