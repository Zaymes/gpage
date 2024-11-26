"use client"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
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
import { BarChartWithCaption, PopulationPyramidChart } from './SectionCharts'
import ChloroplethMap from './Chloropleth';
import CustomPieChart from './PiChartComponent';
import CustomBarChart from './VerticalBarChart';
import HorizontalBarChart from './HorizontalBar';
import TreeMapChart from './TreeMapChart';
import { pie_test_data, bar_data, horizontal_bar, rural_population, populationByWards, population_gender_ethnicity,
  absenteePopulation,
  population_by_language
 } from './data';

// const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
// const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
// const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
// const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
// const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
// const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
// const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
// const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
// const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
// const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
// const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
// const Label = dynamic(() => import('recharts').then(mod => mod.Label), { ssr: false });
// const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });


import useResponsiveChart from '../hooks/useResponsiveChart';

const sampleData = [
  { ageGroup: 'Under 5 years', male: 9725644, female: 9279281 },
  { ageGroup: '5 to 9 years', male: 10210019, female: 9728129 },
  { ageGroup: '10 to 14 years', male: 10974635, female: 10458513 },
  { ageGroup: '15 to 19 years', male: 11196816, female: 10683985 },
  { ageGroup: '20 to 24 years', male: 11400730, female: 10838849 },
  { ageGroup: '25 to 29 years', male: 11574776, female: 11099035 },
  { ageGroup: '30 to 34 years', male: 11533188, female: 11181154 },
  { ageGroup: '35 to 39 years', male: 11139243, female: 10869175 },
  { ageGroup: '40 to 44 years', male: 10497372, female: 10304569 },
  { ageGroup: '45 to 49 years', male: 10160361, female: 10086469 },
  { ageGroup: '50 to 54 years', male: 10433237, female: 10407290 },
  { ageGroup: '55 to 59 years', male: 10628155, female: 10907144 },
  { ageGroup: '60 to 64 years', male: 10244115, female: 10798061 },
  { ageGroup: '65 to 69 years', male: 8488842, female: 9375520 },
  { ageGroup: '70 to 74 years', male: 6716886, female: 7679431 },
  { ageGroup: '75 to 79 years', male: 4325136, female: 5393379 },
  { ageGroup: '80 to 84 years', male: 2626161, female: 3622161 },
  { ageGroup: '85 years and over', male: 2324957, female: 4185150 },
];

// Static data for graphs
const populationData = [
  { year: '2018', value: 380 },
  { year: '2019', value: 385 },
  { year: '2020', value: 392 },
  { year: '2021', value: 398 },
  { year: '2022', value: 402 },
];

const healthData = [
  { facility: 'Hospitals', count: 122 },
  { facility: 'Health Posts', count: 145 },
  { facility: 'Clinics', count: 178 },
  { facility: 'Pharmacies', count: 156 },
];

const educationData = [
  { level: 'Primary', students: 15000, schools: 85 },
  { level: 'Secondary', students: 12000, schools: 45 },
  { level: 'Higher Secondary', students: 8000, schools: 25 },
  { level: 'College', students: 5000, schools: 12 },
];

const marriageDivorce = {
  datas: [
    { year: '2019', Marriage: 385, Divorce: 200 },
    { year: '2020', Marriage: 392, Divorce: 260 },
    { year: '2021', Marriage: 398, Divorce: 300 },
    { year: '2022', Marriage: 402, Divorce: 320 },
  ],
  caption: {
    number: '2',
    indicator: 'annual divorce',
    description: 'while 32 marriage in municipality gor year 2022',
    source: 'Vital Registration'
  },
  title: 'Marriage and Divorce Status',
}

const exampleData = {
  datas: [
    { year: '2018', Birth: 380, Death: 300 },
    { year: '2019', Birth: 385, Death: 200 },
    { year: '2020', Birth: 392, Death: 260 },
    { year: '2021', Birth: 398, Death: 300 },
    { year: '2022', Birth: 402, Death: 320 },
  ],
  data: [
    { facility: 'Hospitals', count: 122 },
    { facility: 'Health Posts', count: 145 },
    { facility: 'Clinics', count: 178 },
    { facility: 'Pharmacies', count: 156 },
  ],
  educationData: [
    { level: 'Primary', students: 15000, schools: 85 },
    { level: 'Secondary', students: 12000, schools: 45 },
    { level: 'Higher Secondary', students: 8000, schools: 25 },
    { level: 'College', students: 5000, schools: 12 },
  ],
  title: 'Birth vs Deaths',
  caption: {
    number: '32',
    indicator: 'net population change',
    description: 'on 100 births and 68 deaths for year 2022',
    source: 'Department of Health'
  }
}



const preparedData_absentee_pie = absenteePopulation.datas.map((item) => ({
  data:[{ name: 'Male', value: item.Male },
  { name: 'Female', value: item.Female },
  ],
  caption: item.caption,
  category: item.category
}));


// component - viz for specific view



// Sector Content Components
export const PopulationContent = () => {
  const { chartWidth, chartHeight } = useResponsiveChart();
  return (
    <div>
      <div className="space-y-6">
        <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
          <div className="col-span-1">
            <h3 className='text-lg text-slate-700 font-semibold mb-4'> Municipal Status</h3>
            <div className="w-52 bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow mb-4">
              <h4 className="text-sm font-medium text-slate-900">Current Population</h4>
              <p className="text-2xl font-bold text-slate-700">402,469</p>
              <div className="text-xs text-blue-500">
                <a
                  href={''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Source: {'Department of Data'}
                </a>
              </div>
            </div>
            <div className="w-52 bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow mb-4">
              <h4 className="text-sm font-medium text-slate-900">Growth Rate</h4>
              <p className="text-2xl font-bold text-slate-700">1.8%</p>
              <div className="text-xs text-blue-500">
                <a
                  href={''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Source: {'Department of Data'}
                </a>
              </div>
            </div>
            <div className="w-52 bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow mb-4">
              <h4 className="text-sm font-medium text-slate-900">Density</h4>
              <p className="text-2xl font-bold text-slate-700">4,567/km²</p>
              <div className="text-xs text-blue-500">
                <a
                  href={''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Source: {'Department of Data'}
                </a>
              </div>
            </div>
            <div className="w-52 bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow mb-4">
              <h4 className="text-sm font-medium text-slate-900">Density</h4>
              <p className="text-2xl font-bold text-slate-700">4,567/km²</p>
              <div className="text-xs text-blue-500">
                <a
                  href={''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Source: {'Department of Data'}
                </a>
              </div>
            </div>

          </div>
          <div className='col-span-5'>
            <CustomBarChart
              data={populationByWards}
              title="Population distribution by ethnicity"
              xAxisKey="wardnumber"
              yAxisKey="Male"
              // xAxisLabel="Value"
              barColor="#3b82f6"
              height={600}
              secondBar='Female'
              // tickFormatter={formatNumber}
              // valuePrefix=""
              className="mx-auto bg-white p-4 rounded-lg shadow-sm"
            />

          </div>
        </div>
      </div>
      <PopulationPyramidChart data={sampleData} />



      {/* <ChloroplethMap /> */}
      <div className='mt-8 relative text-black bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow mt-12 border-2'>
        <h3 className="text-xl font-semibold text-black">Population distribution by Ethnicity</h3>
        <p className='text-gray-400 text-md mt-0'>for Tulsipur Sub-Metropolitan City</p>
        <div className='grid grid-cols-4 content-start gap-2'>
          <div className='col-span-2 '>
            <HorizontalBarChart
              data={population_gender_ethnicity}
              title="Population distribution by ethnicity"
              xAxisKey="Male"
              xAxisKey2="Female"
              yAxisKey="category"
              barColor="#3b82f6"
              height={540}
              // tickFormatter={formatNumber}
              valuePrefix=""
            // className=""
            />
          </div>
          <div className="h-full col-span-2">
            <div>
              {/* <CustomPieChart data={rural_population} title='Rural Population' /> */}
              <TreeMapChart
                data={horizontal_bar}
                title="Population Distribution by Ethnicity"
                colors={['#1f77b4', '#ff7f0e', '#2ca02c']}
                aspectRatio={16 / 9}
                minHeight={500}
                valueFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                tooltipFormatter={(value) => `Population: ${value.toLocaleString()}`}
              />
              <div>
                <div className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow mt-4'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-1'>80%</h2>
                  <p className='text-base text-gray-500 mb-2'>of Total Population</p>
                  <small style={{ color: '#555' }}>Source: <a href={''} target="_blank" rel="noopener noreferrer">Tulsipur Sub-Metropolitan City</a></small>
                </div>
              </div>
            </div>
            {/* <div>
            <CustomPieChart data={pie_test_data} title='Population Distribution by Language' />

          </div> */}
          </div>
        </div>
      </div>

      <div className='mt-8 relative text-black bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow mt-12 border-2'>
        <h3 className="text-xl font-semibold text-black">Population distribution by Language</h3>
        <p className='text-gray-400 text-md mt-0'>for Tulsipur Sub-Metropolitan City</p>
        <div className='grid grid-cols-4 content-start gap-2'>
          <div className='col-span-2 '>
            <HorizontalBarChart
              data={population_by_language}
              title="Population distribution by ethnicity"
              xAxisKey="Male"
              xAxisKey2="Female"
              yAxisKey="category"
              barColor="#3b82f6"
              height={540}
              // tickFormatter={formatNumber}
              valuePrefix=""
            // className=""
            />
          </div>
          <div className="h-full col-span-2">
            <div>
              {/* <CustomPieChart data={rural_population} title='Rural Population' /> */}
              <TreeMapChart
                data={horizontal_bar}
                title="Population Distribution by Ethnicity"
                colors={['#1f77b4', '#ff7f0e', '#2ca02c']}
                aspectRatio={16 / 9}
                minHeight={500}
                valueFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                tooltipFormatter={(value) => `Population: ${value.toLocaleString()}`}
              />
              <div>
                <div className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow mt-4'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-1'>80%</h2>
                  <p className='text-base text-gray-500 mb-2'>of Total Population</p>
                  <small style={{ color: '#555' }}>Source: <a href={''} target="_blank" rel="noopener noreferrer">Tulsipur Sub-Metropolitan City</a></small>
                </div>
              </div>
            </div>
            {/* <div>
            <CustomPieChart data={pie_test_data} title='Population Distribution by Language' />

          </div> */}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-8'>
        <div className='bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow mt-12 border-2'>
          <h3 className="text-xl font-semibold text-black">Marriage vs Divorce</h3>
          <p className='text-gray-400 text-md mt-0 mb-4'>for Tulsipur Sub-Metropolitan City</p>
          <BarChartWithCaption dataset={marriageDivorce} bar1='Marriage' bar2='Divorce' stacked={false} />
        </div>
        <div className='bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow mt-12 border-2'>
          <h3 className="text-xl font-semibold text-black">Birth vs Death</h3>
          <p className='text-gray-400 text-md mt-0 mb-4'>for Tulsipur Sub-Metropolitan City</p>
          <BarChartWithCaption dataset={exampleData} bar1='Birth' bar2='Death' stacked={false} />
        </div>
      </div>
      <div className='bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow mt-8 border-2'>
        <h3 className="text-xl font-semibold text-black">Absentee Population</h3>
        <p className='text-gray-400 text-md mt-0 mb-4'>for Tulsipur Sub-Metropolitan City</p>
        <div className='grid grid-cols-2 gap-8'>
          <div>
            <BarChartWithCaption dataset={marriageDivorce} bar1='Marriage' bar2='Divorce' stacked={false} />
          </div>
          {preparedData_absentee_pie.map((data,index)=>(
          <div key={index}>
            <CustomPieChart data={data.data} title={data.category} caption={data.caption}
             />
          </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export const HealthContent = () => {
  const { chartWidth, chartHeight } = useResponsiveChart();
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Healthcare Facilities Distribution</h3>
      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={chartWidth} height={chartHeight} data={healthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="facility" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ef4444" name="Number of Facilities" minPointSize={0} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={chartWidth} height={chartHeight} data={healthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="facility" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ef4444" name="Number of Facilities" minPointSize={0} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-red-800">Total Facilities</h4>
          <p className="text-2xl font-bold text-red-600">291</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-orange-800">Beds per 1000</h4>
          <p className="text-2xl font-bold text-orange-600">2.8</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800">Medical Staff</h4>
          <p className="text-2xl font-bold text-yellow-600">1,245</p>
        </div>
      </div>
      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={chartWidth} height={chartHeight} data={healthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="facility" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ef4444" name="Number of Facilities" minPointSize={0} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
};

export const EducationContent = () => {
  const { chartWidth = 400, chartHeight = 400 } = useResponsiveChart();
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Education Statistics</h3>
      <div className="w-full" style={{ height: `${chartHeight}px`, border: '2px solid red', paddingBottom: '40px' }}>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart width={chartWidth} height={chartHeight} data={educationData} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" tickLine={true} tick={{ stroke: 'red', strokeWidth: 2 }} label={{ value: "XAxis Label" }} />
            <YAxis yAxisId="left" interval={0} />
            {/* <YAxis yAxisId="right" orientation="right" /> */}
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line yAxisId="left" type="monotone" dataKey="students" stroke="#8b5cf6" name="Students" />
            <Line yAxisId="left" type="monotone" dataKey="schools" stroke="#2dd4bf" name="Schools" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-violet-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-violet-800">Total Students</h4>
          <p className="text-2xl font-bold text-violet-600">40,000</p>
        </div>
        <div className="bg-teal-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-teal-800">Total Schools</h4>
          <p className="text-2xl font-bold text-teal-600">167</p>
        </div>
        <div className="bg-cyan-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-cyan-800">Literacy Rate</h4>
          <p className="text-2xl font-bold text-cyan-600">89.5%</p>
        </div>
      </div>
    </div>
  )
};

// Placeholder content for other sectors
export const DefaultContent = ({ sector }) => (
  <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
    <p className="text-gray-500">Content for {sector} sector coming soon...</p>
  </div>
);
