import DataPreparationUtils from "@/lib/transforms/chartData";
import HighchartsWrapper from "@/components/HighChartsWrapper";
import CategorySummary from './CategorySummary';

interface DistributionWrapperProps {
    wardData: [];
    language: string; // Assuming language is of type string
    indicatorCode: string; // New prop for indicator code
}

const DistributionVizWrapper: React.FC<DistributionWrapperProps> = ({ wardData, language, indicatorCode }) => {
    const wardChartData = DataPreparationUtils.prepareMainIndicatorChartData1(
        wardData,
        indicatorCode,
        language,  // language
        "pie"  // optional indicator code
    )
    const totalValue = wardChartData.series[0].data.reduce((sum, item) => sum + item.y, 0);
    return (
        <div className="mx-auto grid grid-cols-5 gap-4 h-full my-8 py-8 px-4 rounded-lg shadow-md bg-slate-50">
            <div className="col-span-3">
                <HighchartsWrapper chartType="pie" data={wardChartData} />
            </div>
            <div className="col-span-2">
                <CategorySummary
                    top3={wardChartData.categorySummary.top3}
                    bottom3={wardChartData.categorySummary.bottom3}
                    totalValue={totalValue}
                    categoryLen={wardChartData.categories.length}
                />
            </div>
        </div>
    )
}

export default DistributionVizWrapper