import { WardIndicatorData, CategoryIndicatorData, YearlyIndicatorData } from '../../../types/data';
import { mean, median, standardDeviation, sum } from 'simple-statistics';
import { getTopAndBottomElements } from '../stats/simpleCalculations';
import { toHinduNumeral } from './statistics';

interface CategorySummary {
  top3: Array<{name: string, value: number}>;
  bottom3: Array<{name: string, value: number}>;
}
interface ChartDataPreparationResult {
  categories: string[];
  series: { name: string; data: number[] }[];
  pieseries: {name:string[], data:{name:string, y:number}}[];
  categorySummary: CategorySummary;
  labels: {
    x: string;
    y: string;
    tooltip: string;
  };
  stats: {
    mean: string;
    median: string;
    standardDeviation: string;
    count: string;
    top: [];
    bottom: [];
  };
  indicatorType: string;
  theme: string;
}

export default class DataPreparationUtils {
  /**
   * Prepare data for Ward-based Bar Chart (First Dataset)
   * @param data Array of ward-level data
   * @param language 'en' or 'ne'
   * @param indicatorCode Specific indicator to filter
   */
  static prepareWardBarChartData(
    data: WardIndicatorData[], 
    language?:string, 
    indicatorCode?: string
  ): ChartDataPreparationResult {
    // Filter data by indicator code if provided

    const filteredData = indicatorCode 
      ? data.filter(item => item.indicator_code === indicatorCode)
      : data;

    // Determine labels based on language
    const wardLabel = language === 'en' ? 'ward_name_en' : 'ward_name_ne';
    const valueLabel = language === 'en' ? 'indicator_value_en' : 'indicator_value_en';

    // Prepare chart data
    const categories = filteredData.map(item => item[wardLabel]);

    
    // this looks like a hack needs to change
    // TODO also change the categogory_np to category_ne later.
    // const theme = language === 'en' ? filteredData[0].category : filteredData[0].category_ne
    const theme = language === 'en' ? filteredData[0]?.indicator_name_en : filteredData[0]?.indicator_name_ne
    const values = filteredData.map(item => parseFloat(item[valueLabel] || '0'));
    const {top5, bottom5} = getTopAndBottomElements(values, categories)

    // Calculate statistics
    const stats = {
      mean: language === 'en'? (mean(values)) : toHinduNumeral((mean(values))),
      median: language === 'en'? median(values) : toHinduNumeral(median(values)),
      standardDeviation: language === 'en'? standardDeviation(values): toHinduNumeral(standardDeviation(values)),
      count: language === 'en'?  sum(values) : toHinduNumeral(sum(values)),
      top: top5,
      bottom: bottom5,
    };

    return {
      categories,
      series: [{
        name: language === 'en' ? filteredData[0]?.indicator_name_en : filteredData[0]?.indicator_name_ne,
        data: values
      }],
      labels: {
        x: language === 'en' ? 'Wards' : 'वडाहरू',
        y: language === 'en' ? filteredData[0]?.indicator_name_en : filteredData[0]?.indicator_name_ne,
        tooltip: language === 'en' ? filteredData[0]?.indicator_name_en : filteredData[0]?.indicator_name_ne
      },
      stats,
      indicatorType: filteredData[0]?.indicator_type || 'numeric',
      theme
    };
  }

  /**
   * Prepare data for Main Indicator Bar and Pie Charts (Second Dataset)
   * @param data Array of main indicator data
   * @param language 'en' or 'ne'
   * @param chartType 'bar' or 'pie'
   */
  static prepareMainIndicatorChartData(
    data: CategoryIndicatorData[], 
    language: 'en' | 'ne' = 'en',
    chartType: 'bar' | 'pie' = 'bar'
  ): ChartDataPreparationResult {
    // Determine labels based on language
    const mainIndicatorLabel = language === 'en' ? 'main_indicator_name_en' : 'main_indicator_name_ne';
    const subIndicatorLabel = language === 'en' ? 'sub_indicator_name_en' : 'sub_indicator_name_ne';
    // make only read english value
    const valueLabel = language === 'en' ? 'indicator_value_en' : 'indicator_value_en';

    // Group by main indicator
    const groupedData = data.reduce((acc, item) => {
      const key = item[mainIndicatorLabel];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as Record<string, CategoryIndicatorData[]>);

    // Prepare chart data
    const categories: string[] = [];
    const series: { name: string; data: number[] }[] = [];

    Object.entries(groupedData).forEach(([mainIndicator, items]) => {
      categories.push(mainIndicator);
      
      // Aggregate values based on chart type
      if (chartType === 'bar') {
        // For bar chart, use sub-indicators
        const subSeries = items.map(item => ({
          name: item[subIndicatorLabel],
          data: [parseFloat(item[valueLabel] || '0')]
        }));
        series.push(...subSeries);
      } else {
        // For pie chart, aggregate total values
        const totalValue = items.reduce((sum, item) => 
          sum + parseFloat(item[valueLabel] || '0'), 0);
        series.push({ name: mainIndicator, data: [totalValue] });
      }
    });

    // Calculate statistics (using first series)
    const values = series[0]?.data || [];
    const stats = {
      mean: mean(values),
      median: median(values),
      standardDeviation: standardDeviation(values),
    };

    return {
      categories,
      series,
      labels: {
        x: language === 'en' ? 'Indicators' : 'सूचकहरू',
        y: language === 'en' ? 'Values' : 'मान',
        tooltip: language === 'en' ? 'Indicator Distribution' : 'सूचक वितरण'
      },
      stats,
      indicatorType: data[0]?.indicator_type || 'numeric'
    };
  }

  /**
   * Prepare data for Time Series Bar Chart (Third Dataset)
   * @param data Array of time series data
   * @param language 'en' or 'ne'
   */
  static prepareTimeSeriesChartData(
    data: YearlyIndicatorData[],
    indicatorCode: string,
    language: 'en' | 'ne' = 'en'
  ): ChartDataPreparationResult {
    // Determine labels based on language
    const indicatorLabel = language === 'en' ? 'indicator_name_en' : 'indicator_name_ne';
    const valueLabel = language === 'en' ? 'indicator_value_en' : 'indicator_value_en';
  
    // Filter data by the specific indicator_code
    const filteredData = data.filter(item => item.indicator_code === indicatorCode);
  
    // Check if filtered data exists
    if (filteredData.length === 0) {
      return {
        categories: [],
        series: [],
        labels: {
          x: language === 'en' ? 'Years' : 'वर्षहरू',
          y: language === 'en' ? 'Values' : 'मान',
          tooltip: filteredData[0][indicatorLabel].concat( language=== "en" ? "annual trend" : "वार्षिक प्रवृत्ति" )
        },
        stats: {
          mean: 0,
          median: 0,
          standardDeviation: 0
        },
        indicatorType: 'numeric'
      };
    }
  
    // Group by year
    const groupedData = filteredData.reduce((acc, item) => {
      if (!acc[item.year]) {
        acc[item.year] = {};
      }
      acc[item.year][item[indicatorLabel]] = parseFloat(item[valueLabel] || '0');
      return acc;
    }, {} as Record<string, Record<string, number>>);
  
    // Prepare chart data
    const categories = Object.keys(groupedData).sort();
    const series = Object.entries(groupedData[categories[0]] || {}).map(([indicator]) => ({
      name: indicator,
      data: categories.map(year => groupedData[year]?.[indicator] || 0)
    }));
  
    // Calculate statistics (using first series)
    const stats = {
      mean: '0',
      median: '0',
      standardDeviation: '0'
    };
  
    return {
      categories,
      series,
      labels: {
        x: language === 'en' ? 'Years' : 'वर्षहरू',
        y: language === 'en' ? 'Values' : 'मान',
        tooltip: filteredData[0][indicatorLabel].concat( language=== "en" ? " annual trend" : " वार्षिक प्रवृत्ति" )
      },
      stats,
      indicatorType: filteredData[0]?.indicator_type || 'numeric'
    };
  }
  

  static prepareMainIndicatorChartData1(
    data: CategoryIndicatorData[], 
    indicatorCode: string,
    language: 'en' | 'ne' = 'en',
  ): ChartDataPreparationResult {
    const mainIndicatorLabel = language === 'en' ? 'main_indicator_name_en' : 'main_indicator_name_ne';
    const subIndicatorLabel = language === 'en' ? 'sub_indicator_name_en' : 'sub_indicator_name_ne';
    const valueLabel = language === 'en' ? 'indicator_value_en' : 'indicator_value_en';
  
    // Filter data by the specific indicator_code
    const filteredData = data.filter(item => item.indicator_code === indicatorCode);
  
    if (filteredData.length === 0) {
      return {
        categories: [],
        series: [],
        pieseries:[],
        labels: {
          x: language === 'en' ? 'Sub Indicators' : 'उप सूचकहरू',
          y: language === 'en' ? 'Values' : 'मान',
          tooltip: language === 'en' ? 'Indicator Distribution' : 'सूचक वितरण hora'
        },
        stats: {
          mean: '0',
          median: '0',
          standardDeviation: '0'
        },
        indicatorType: 'numeric'
      };
    }
  
    const mainIndicator = filteredData[0][mainIndicatorLabel];
    const categories = filteredData.map(item => item[subIndicatorLabel]);
  
    // Correct series preparation
    // again need to add to series later
    const seriesData = filteredData.map(item => ({
      // const value = parseFloat(item[valueLabel]);
      // return isNaN(value) ? 0 : value;
      name: item[subIndicatorLabel],
      y: parseFloat(item[valueLabel] || '0')

    }))
    const pieseries = [{
      name: mainIndicator,
      data: filteredData.map(item => ({
        // const value = parseFloat(item[valueLabel]);
        // return isNaN(value) ? 0 : value;
        name: item[subIndicatorLabel],
        y: parseFloat(item[valueLabel] || '0')
  
      }))
    }];
    
    const series = [{
      name: mainIndicator,
      data: filteredData.map(item => ({
        // const value = parseFloat(item[valueLabel]);
        // return isNaN(value) ? 0 : value;
        name: item[subIndicatorLabel],
        y: parseFloat(item[valueLabel] || '0')
  
      }))
    }];

    const sortedData = [...seriesData].sort((a, b) => b.y - a.y);


    const categorySummary: CategorySummary = {
      top3: sortedData.slice(0, 3).map(item => ({
        name: item.name,
        value: item.y
      })),
      bottom3: sortedData.slice(-3).reverse().map(item => ({
        name: item.name,
        value: item.y
      }))
    };

  
    
  
  
    return {
      categories,
      series,
      categorySummary,
      pieseries,
      labels: {
        x: language === 'en' ? 'Sub Indicators' : 'उप सूचकहरू',
        y: language === 'en' ? 'Values' : 'मान',
        tooltip:  `${mainIndicator}`
      },
      stats: {
        mean: '0',
        median: 'o',
        standardDeviation: '0'
      },
      indicatorType: filteredData[0]?.indicator_type || 'numeric'
    };
  }
}


