import React from 'react';
import CustomBarChart from '../VerticalBarChart';

interface StatCardProps {
    title: string;
    value: string | number;
    source?: {
      name: string;
      url?: string;
    };
  }
  
  interface MunicipalDashboardProps {
    sectionTitle: string;
    stats: StatCardProps[];
    chartData: any[];
    chartTitle: string;
    xAxisKey: string;
    yAxisKey: string;
    secondBar?: string;
    barColor?: string;
    height?: number;
  }
  
  // Stat Card Component
  const StatCard: React.FC<StatCardProps> = ({ title, value, source }) => (
    <div className="w-52 bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow mb-4">
      <h4 className="text-sm font-medium text-slate-900">{title}</h4>
      <p className="text-2xl font-bold text-slate-700">{value}</p>
      {source && (
        <div className="text-xs text-blue-500">
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Source: {source.name}
            </a>
          ) : (
            <span>Source: {source.name}</span>
          )}
        </div>
      )}
    </div>
  );
  
  const StatSectionWithBar: React.FC<MunicipalDashboardProps> = ({
    sectionTitle,
    stats,
    chartData,
    chartTitle,
    xAxisKey,
    yAxisKey,
    secondBar,
    barColor,
    height,
  }) => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="col-span-1">
            <h3 className="text-lg text-slate-700 font-semibold mb-4">
              {sectionTitle}
            </h3>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
          <div className="col-span-5">
            <CustomBarChart
              data={chartData}
              title={chartTitle}
              xAxisKey={xAxisKey}
              yAxisKey={yAxisKey}
              secondBar={secondBar}
              barColor={barColor}
              height={height}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default StatSectionWithBar;