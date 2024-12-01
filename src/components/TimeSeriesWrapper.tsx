import DataPreparationUtils from "@/lib/transforms/chartData";
import HighchartsWrapper from "@/components/HighChartsWrapper";

interface DistributionWrapperProps {
    wardData: [];
    language: string; // Assuming language is of type string
    indicatorCode: string; // New prop for indicator code
}

const TimeSeriesWrapper: React.FC<DistributionWrapperProps> = ({ wardData, language, indicatorCode }) => {
    // const { wardData, categoryData, yearlyData, mainBannerData, isLoading, error } = useData();
    // const language = useLocale();


    const wardChartData = DataPreparationUtils.prepareTimeSeriesChartData(
        wardData,
        indicatorCode,
        language,  // language  // optional indicator code
    )
    return (
        <div className="my-8 py-8 px-4 rounded-lg shadow-md bg-slate-50">
                <HighchartsWrapper chartType="column" data={wardChartData} />
        </div>
    )
}

export default TimeSeriesWrapper