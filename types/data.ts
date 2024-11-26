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