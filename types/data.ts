export interface BaseIndicatorData {
    category: string;
    indicator_code: string;
    indicator_value_ne: string;
    indicator_value_en: string;
    indicator_type: string;
}

export type MainBannerData = Omit<WardIndicatorData, 'category'>;


export interface WardIndicatorData extends BaseIndicatorData {
    category_np: string;
    ward_number: string;
    ward_name_ne: string;
    ward_name_en: string;
    indicator_name_ne: string;
    indicator_name_en: string;
}

export interface CategoryIndicatorData extends BaseIndicatorData {
    category_ne: string;
    main_indicator_name_ne: string;
    main_indicator_name_en: string;
    sub_indicator_name_ne: string;
    sub_indicator_name_en: string;
}

export interface YearlyIndicatorData extends BaseIndicatorData {
    category_np: string;
    indicator_name_ne: string;
    indicator_name_en: string;
    year: string;
}

export interface DataContextType {
    wardData: WardIndicatorData[];
    categoryData: CategoryIndicatorData[];
    yearlyData: YearlyIndicatorData[];
    mainBannerData: MainBannerData[];
    isLoading: boolean;
    error: Error | null;
}

export interface StatisticalMetrics {
    mean: number;
    median: number;
    standardDeviation: number;
  }
  
  // Chart Series Item
  export interface ChartSeriesItem {
    name: string;
    data: number[];
  }
  
  // Multilingual Labels
  export interface ChartLabels {
    x: string;
    y: string;
    tooltip: string;
  }
  
  // Comprehensive Chart Data Preparation Result
  export interface ChartDataPreparationResult {
    // Categories for X-axis
    categories: string[];
  
    // Data series for charting
    series: ChartSeriesItem[];
  
    // Multilingual labels
    labels: ChartLabels;
  
    // Statistical calculations
    stats: StatisticalMetrics;
  
    // Indicator type (e.g., 'numeric', 'percentage')
    indicatorType: string;
  }