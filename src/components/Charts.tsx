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
import {BarChartWithCaption, PopulationPyramidChart} from './SectionCharts'
import ChloroplethMap from './Chloropleth';

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

const exampleData = {
  datas: [
    { year: '2018', value: 380 },
    { year: '2019', value: 385 },
    { year: '2020', value: 392 },
    { year: '2021', value: 398 },
    { year: '2022', value: 402 },
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
  title: 'Health Facilities Accessibility',
  caption: 'Population Growth Trend'
}




// component - viz for specific view



// Sector Content Components
export const PopulationContent = () => {
  const { chartWidth, chartHeight } = useResponsiveChart();
  return (
    <div>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-black">Population Growth Trend</h3>
        <div className="w-full" style={{ height: `${chartHeight}px` }}>
          {populationData && populationData.length > 0 && (
            <ResponsiveContainer width="50%" height="100%">
              <AreaChart data={populationData} width={chartWidth} height={chartHeight} margin={{ top: 40, right: 20, left: 20, bottom: 50 }}>
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <CartesianAxis orientation='bottom' />
                <XAxis
                  dataKey="year"
                />
                <YAxis
                  hide={false}
                  width={60}
                  height={chartHeight}
                  orientation='left'
                  // allowDataOverflow
                  // tick={{ fill: '#333' }}
                  // label={{ value: 'Population', angle: -90, position: 'insideLeft' }}
                  domain={['dataMin', 'dataMax']}
                />
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="top" align="center" />
                <Area type="monotone" dataKey="value" fill="#3b82f6" stroke="#2563eb" name="Population" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800">Current Population</h4>
            <p className="text-2xl font-bold text-blue-600">402,469</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-green-800">Growth Rate</h4>
            <p className="text-2xl font-bold text-green-600">1.8%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-purple-800">Density</h4>
            <p className="text-2xl font-bold text-purple-600">4,567/km²</p>
          </div>
        </div>
      </div>
      <ChloroplethMap/>
      {/* <BarChartWithCaption dataset={exampleData}/> */}
      <BarChartWithCaption dataset={exampleData}/>
      <PopulationPyramidChart data={sampleData}/>
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
