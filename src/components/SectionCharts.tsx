import useResponsiveChart from '../hooks/useResponsiveChart';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
  CartesianAxis,
  LabelList,
  Cell
} from 'recharts';
import InfoDisplay from './StatsDescription';

import { data01, colors, dataCardData } from './data'




export const BarChartWithCaption = ({dataset, bar1, bar2, stacked}) => {
  const { chartWidth, chartHeight } = useResponsiveChart();
  const { datas, caption, title } = dataset
  console.log('BAR chart data', dataset)
  return ( 
        <div className="grid grid-cols-1 md:grid-cols-4 content-end">
          {/* First Element: Takes 2/3 width on medium and larger screens */}
          <div className="md:col-span-1 my-auto">
            {/* TODO: add the grid here in right of the section the caption will be loaded */}
            <InfoDisplay info={caption}  />
          </div>
          {/* Second Element: Takes 1/3 width on medium and larger screens */}
          <div className="md:col-span-3">
            <div className="w-full p-4" style={{ height: `${chartHeight}px` }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={chartWidth} height={chartHeight} data={datas} barCategoryGap={20}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey='year' />
                  <YAxis dataKey={bar1}/>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={bar1} stackId={stacked ? 'a' : 'b'} fill="#6ABDE7" name={bar1}/>
                  <Bar dataKey={bar2} stackId={stacked ? 'a' : 'c'} fill="grray" opacity={0.6} name={bar2}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
  )
};

export const HorizontalBarChart = ({dataset, bar1, bar2, stacked}) => {
  const { chartWidth, chartHeight } = useResponsiveChart();
  const { datas, caption, title } = dataset
  console.log('BAR chart data', dataset)
  return (
    <div className='bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow mt-12'>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 content-end">
          {/* First Element: Takes 2/3 width on medium and larger screens */}
          <div className="md:col-span-1 my-auto">
            {/* TODO: add the grid here in right of the section the caption will be loaded */}
            <InfoDisplay info={caption}  />
          </div>
          {/* Second Element: Takes 1/3 width on medium and larger screens */}
          <div className="md:col-span-3">
            <div className="w-full p-4" style={{ height: `${chartHeight}px` }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={chartWidth} height={chartHeight} data={datas} barCategoryGap={20}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey='year' />
                  <YAxis dataKey={bar1}/>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={bar1} stackId={stacked ? 'a' : 'b'} fill="#ef4444" name={bar1}/>
                  <Bar dataKey={bar2} stackId={stacked ? 'a' : 'c'} fill="#000" name={bar2}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};



export const PopulationPyramidChart = ({ data }) => {
  const formattedData = data.map((entry) => ({
    ...entry,
    male: -entry.male, // Negative for display on the left side
  }));
  const renderPositiveLabel = (props) => {
    const { x, y, width, value } = props;
    console.log('width', width, x)
    const positiveValue = Math.abs(value); // Convert negative to positive

    return (
      <text x={x + width + 4} y={y} dy={16} fill="#000" className='text-sm'>
        {positiveValue}
      </text>
    );
  };
  return (
    <div className='bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow mt-12 border-2'>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-black">Population distribution by age and sex</h3>
        <p className='text-gray-400 text-md mt-0'>for Tulsipur Sub-Metropolitan City</p>
        <div className="grid grid-cols-1 md:grid-cols-4 content-end">
          <div className="md:col-span-3">
            <ResponsiveContainer width="90%" height={600}>
              <BarChart
                layout="vertical"
                data={formattedData}
                // margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                // barCategoryGap="10%" // Adjust this to control spacing between bars
                // barSize="100%"
                margin = {{ top: 40, right: 16, left: 16, bottom: 20 }}
                stackOffset="sign"
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 0" />
                <XAxis
                  type="number"
                  tick={{ fontSize: '14' }}
                  domain={[-12000000, 12000000]} // Adjust domain as needed
                  tickFormatter={(value) => `${Math.abs(value / 1000000)}M`
                  }
                />
                <YAxis dataKey="ageGroup" type="category" tick={{ fontSize: '12' }} />
                <Tooltip
                  formatter={(value) =>
                    value < 0 ? `${Math.abs(value).toLocaleString()}` : value.toLocaleString()
                  }
                />
                <Legend />
                {/* Separate the bars without stackId */}
                <Bar dataKey="male" stackId={1} fill="#6abde7" name="Male">
                  {/* See later */}
                  <LabelList dataKey="male" position="insideRight" content={renderPositiveLabel} />
                </Bar>
                {/* D71A60 */}
                <Bar dataKey="female" stackId={1} fill="gray" name="Female" opacity={0.6}>
                  <LabelList dataKey="female" position="insideRight" className='text-sm text-black' fill='#000' />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="md:col-span-1 ">
            {/* TODO: add the grid here in right of the section the caption will be loaded */}
            <div className='text-black mb-4'>
              <p className='text-lg'><span className='font-bold text-3xl'>70%</span> of total population</p>
              <p className='text-md mb-2'>in Tulsipur Sub-Metropolitan City fallunder the working age group</p>
            </div>
            <div className='text-black'>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={data01}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className='italic text-sm text-cyan-900 pt-8'>department of health and population</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// total families
// average faily size
// joint, nuclear family
// female head of family
// total population
// sex rate
// population rate
// children population
// child sex ratio
// literacy ratio


