import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartDataPreparationResult } from '../../types/data'
import HighchartsExporting from 'highcharts/modules/exporting'
import HC_data from 'highcharts/modules/export-data'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
  HC_data(Highcharts)
}

interface HighchartsWrapperProps {
  chartType: 'bar' | 'pie' | 'line' | 'column';
  data: ChartDataPreparationResult;
}

const HighchartsWrapper: React.FC<HighchartsWrapperProps> = ({
  chartType,
  data
}) => {
  if (chartType === 'pie') {
  }
  // Dynamic chart configuration based on type and data
  const getChartOptions = () => {
    const baseOptions = {
      title: { text: data.labels.tooltip },
      //   exporting: {
      //     buttons: {
      //         contextButton: {
      //             menuItems: ['downloadPDF', 'viewData', 'downloadPNG', 'downloadSVG']
      //         }
      //     }
      // },
      xAxis: {
        categories: data.categories,
        labels:{
          step:1,
          autoRotation: false
        }
        // title: { text: data.labels.x }
      },
      yAxis: {
        title: { text: data.labels.y }
      },
      series: data.series,
    };

    switch (chartType) {
      case 'bar':
        return {
          ...baseOptions,
          chart: { type: 'bar', height:460},
          legend: {enabled: false}
        };
      case 'pie':
        return {
          ...baseOptions,
          chart: { type: 'pie' },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f}%'
              }
            }
          }
        };
      case 'line':
        return {
          ...baseOptions,
          chart: { type: 'line' }
        };
      case 'column':
        return {
          ...baseOptions,
          borderWidth: 1,
          borderColor: '#666',
          dataLabels: {
            enabled: true,
            style: { color: '#333', textOutline: 'none' }

          }
        }

    }
  };

  return (
    <div className='rounded-lg shadow-sm py-8 px-4 bg-white'>
      <HighchartsReact
        highcharts={Highcharts}
        options={getChartOptions()}
      />
    </div>
  );
};


export default HighchartsWrapper