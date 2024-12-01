import DataPreparationUtils from "@/lib/transforms/chartData";
import HighchartsWrapper from "@/components/HighChartsWrapper";
import BarSummary from "@/components/BarStatsSummary";


interface WarwiseVizWrapperProps {
    wardData: [];
    language: string; // Assuming language is of type string
    indicatorCode: string; // New prop for indicator code
}

const WarwiseVizWrapper: React.FC<WarwiseVizWrapperProps> = ({ wardData, language, indicatorCode }) => {
    // const { wardData, categoryData, yearlyData, mainBannerData, isLoading, error } = useData();
    // const language = useLocale();


    const wardChartData = DataPreparationUtils.prepareWardBarChartData(
        wardData,
        language,  // language
        indicatorCode  // optional indicator code
    )
    return (
    <div className="mx-auto grid grid-cols-5 gap-4 h-full my-8 py-8 px-4 rounded-lg shadow-md bg-slate-50">
            <div className="col-span-3">
                <HighchartsWrapper chartType="bar" data={wardChartData} />
            </div>
            <div className="col-span-2">
                <BarSummary
                    top5={wardChartData.stats.top}
                    bottom5={wardChartData.stats.bottom}
                    theme={wardChartData.theme}
                    sum={wardChartData.stats.count}
                    average={wardChartData.stats.mean}
                    indicator_type={wardChartData.indicatorType} />
            </div>
        </div>
    )
}

export default WarwiseVizWrapper