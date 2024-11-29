import DataPreparationUtils from "@/lib/transforms/chartData";
import HighchartsWrapper from "@/components/HighChartsWrapper";
import CategorySummary from './CategorySummary';

interface DistributionWrapperProps {
    wardData: any;
    language: string; // Assuming language is of type string
    indicatorCode: string; // New prop for indicator code
}

const TimeSeriesWrapper: React.FC<DistributionWrapperProps> = ({ wardData, language, indicatorCode }) => {
    // const { wardData, categoryData, yearlyData, mainBannerData, isLoading, error } = useData();
    // const language = useLocale();


    const wardChartData = DataPreparationUtils.prepareTimeSeriesChartData(
        wardData,
        indicatorCode,
        "en",  // language  // optional indicator code
    )
    // console.warn('Plotted timed series', wardChartData)
    return (
        <div className="">
                <HighchartsWrapper chartType="column" data={wardChartData} />
        </div>
    )
}

export default TimeSeriesWrapper