import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Type definition for ward data
interface WardData {
  name: string;
  [key: string]: number | string;
}

interface WardDataVisualizationProps {
  wardData: WardData[];
  dataKeys?: string[];
}

const WardDataVisualization: React.FC<WardDataVisualizationProps> = ({ 
  wardData, 
  dataKeys = ['population', 'budget'] 
}) => {
  // Dynamically calculate insights
  const insights = useMemo(() => {
    // Find numeric columns dynamically
    const numericColumns = Object.keys(wardData[0])
      .filter(key => typeof wardData[0][key] === 'number' && key !== 'name');

    // Calculate insights for each numeric column
    const columnInsights = numericColumns.map(column => {
      const values = wardData.map(ward => Number(ward[column]));
      const total = values.reduce((sum, value) => sum + value, 0);
      const average = total / wardData.length;
      const maxWard = wardData.reduce((max, ward) => 
        Number(ward[column]) > Number(max[column]) ? ward : max
      );

      return {
        column,
        total,
        average: Math.round(average),
        maxWard: maxWard.name,
        maxValue: Number(maxWard[column])
      };
    });

    return columnInsights;
  }, [wardData]);

  return (
    <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
      {/* Bar Chart Section */}
      <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Ward Data Comparison
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={wardData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((key, index) => (
              <Bar 
                key={key} 
                dataKey={key} 
                fill={`hsl(${index * 60}, 70%, 50%)`} 
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Dynamic Insights Section */}
      <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-4 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">Ward Data Insights</h3>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={insight.column} className="bg-white p-3 rounded-md shadow-sm">
              <h4 className="font-semibold text-gray-700 capitalize">
                {insight.column.replace(/([A-Z])/g, ' $1')}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-blue-600">
                    {insight.total.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average</p>
                  <p className="text-xl font-bold text-green-600">
                    {insight.average.toLocaleString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Highest Ward</p>
                  <p className="text-lg font-bold text-purple-600">
                    {insight.maxWard}
                  </p>
                  <p className="text-sm text-gray-500">
                    Value: {insight.maxValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WardDataVisualization;