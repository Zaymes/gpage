import { useData } from '@/contexts/DataContext';
import { useLocale } from 'next-intl';
import DataPreparationUtils from "@/lib/transforms/chartData";
import HighchartsWrapper from "@/components/HighChartsWrapper";
import BarSummary from "@/components/BarStatsSummary";


interface WarwiseVizWrapperProps {
    wardData: any; 
    language: string; // Assuming language is of type string
    indicatorCode: string; // New prop for indicator code
}

const  WarwiseVizWrapper:React.FC<WarwiseVizWrapperProps>=({wardData, language, indicatorCode}) =>{
    // const { wardData, categoryData, yearlyData, mainBannerData, isLoading, error } = useData();
    // const language = useLocale();


    const wardChartData = DataPreparationUtils.prepareWardBarChartData(
        wardData,
        language,  // language
        indicatorCode  // optional indicator code
    )
    return (
        <div className="mx-auto grid grid-cols-5 gap-4 h-full my-8 border-2 py-8 px-4">
            <div className="col-span-3">
                <HighchartsWrapper chartType="bar" data={wardChartData} />
            </div>
            <div className="col-span-2">
                <BarSummary top5={wardChartData.stats.top} bottom5={wardChartData.stats.bottom} theme={wardChartData.theme} sum={wardChartData.stats.count} />
            </div>
        </div>
    )
}

export default WarwiseVizWrapper