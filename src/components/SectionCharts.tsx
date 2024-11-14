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
  CartesianAxis
} from 'recharts';


export const BarChartWithCaption = ({ dataset }) => {
  const { chartWidth, chartHeight } = useResponsiveChart();
  const { data, caption, title } = dataset
  return (
    <div className='bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow mt-12'>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 content-end">
          {/* First Element: Takes 2/3 width on medium and larger screens */}
          <div className="md:col-span-1 my-auto">
            {/* TODO: add the grid here in right of the section the caption will be loaded */}
            <div className='text-black'>
              <p className='text-lg'><span className='font-bold text-3xl'>32%</span> of total population</p>
              <p className='text-md'>have access to the health services</p>
              <p className='italic text-sm text-cyan-900'>department of health and population</p>
            </div>
          </div>

          {/* Second Element: Takes 1/3 width on medium and larger screens */}
          <div className="md:col-span-3">
            <div className="w-full p-4" style={{ height: `${chartHeight}px` }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={chartWidth} height={chartHeight} data={data} barSize={80} barCategoryGap={5}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="facility" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#ef4444" name="Number of Facilities" minPointSize={0} />
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
  return (
    <div className='bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow mt-12'>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-black">Population distribution by age and sex</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 content-end">
          <div className="md:col-span-1 my-auto">
            {/* TODO: add the grid here in right of the section the caption will be loaded */}
            <div className='text-black'>
              <p className='text-lg'><span className='font-bold text-3xl'>32%</span> of total population</p>
              <p className='text-md'>have access to the health services</p>
              <p className='italic text-sm text-cyan-900'>department of health and population</p>
            </div>
          </div>
          <div className="md:col-span-3">
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                layout="vertical"
                data={formattedData}
                // margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                barCategoryGap="10%" // Adjust this to control spacing between bars
                // barSize="100%"
                stackOffset="sign"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  domain={[-12000000, 12000000]} // Adjust domain as needed
                  tickFormatter={(value) => `${Math.abs(value / 1000000)}M`}
                />
                <YAxis dataKey="ageGroup" type="category" tick={{fontSize:'11'}}/>
                <Tooltip
                  formatter={(value) =>
                    value < 0 ? `${Math.abs(value).toLocaleString()}` : value.toLocaleString()
                  }
                />
                <Legend />
                {/* Separate the bars without stackId */}
                <Bar dataKey="male" stackId={1} fill="#6abde7" name="Male" />
                <Bar dataKey="female" stackId={1} fill="#fdbf50" name="Female" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};



