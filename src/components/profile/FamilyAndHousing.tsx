import StatSectionWithBar from "../ui/StatSectionWithBar";
import { wardwise_family } from "../data";


const dashboardData = {
    sectionTitle: "Municipal Status",
    stats: [
      {
        title: "Total No. of Families",
        value: "42,000",
        source: { name: "Municipality Office" }
      },
      {
        title: "Growth Rate",
        value: "1.8%",
        source: { name: "Municipality Office" }
      },
      {
        title: "Density",
        value: "4,567/km²",
        source: { name: "Municipality Office" }
      }
    ],
    chartData: wardwise_family,
    chartTitle: "Wardwise Family Number",
    xAxisKey: "wardnumber",
    yAxisKey: "Value",
    // secondBar: "Number of Houses"
  };


  export const FamilyAndHousing = () => {
    return(
        <StatSectionWithBar {...dashboardData} />
    )
  }
