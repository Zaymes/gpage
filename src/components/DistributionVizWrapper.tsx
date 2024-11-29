import DataPreparationUtils from "@/lib/transforms/chartData";
import HighchartsWrapper from "@/components/HighChartsWrapper";
import CategorySummary from './CategorySummary';

interface DistributionWrapperProps {
    wardData: any;
    language: string; // Assuming language is of type string
    indicatorCode: string; // New prop for indicator code
}

const DistributionVizWrapper: React.FC<DistributionWrapperProps> = ({ wardData, language, indicatorCode }) => {
    // const { wardData, categoryData, yearlyData, mainBannerData, isLoading, error } = useData();
    // const language = useLocale();


    const wardChartData = DataPreparationUtils.prepareMainIndicatorChartData1(
        wardData,
        indicatorCode,
        language,  // language
        "pie"  // optional indicator code
    )
    const totalValue = wardChartData.series[0].data.reduce((sum, item) => sum + item.y, 0);
    console.log('Ward chart data for s8b-indicaotr', totalValue, wardChartData)
    return (
        <div className="mx-auto grid grid-cols-5 gap-4 h-full my-8 mx-4 py-4 pl-4 border-2">
            <div className="col-span-3">
                <HighchartsWrapper chartType="pie" data={wardChartData} />
            </div>
            <div className="col-span-2">
                <CategorySummary
                    top3={wardChartData.categorySummary.top3}
                    bottom3={wardChartData.categorySummary.bottom3}
                    totalValue={totalValue}
                />
            </div>
        </div>
    )
}

export default DistributionVizWrapper