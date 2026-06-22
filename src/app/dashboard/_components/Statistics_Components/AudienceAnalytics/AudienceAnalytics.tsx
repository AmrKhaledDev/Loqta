"use client";

import KPI_Cards from "./_components/KPI_Cards";
import RegionSalesChart from "./_components/RegionSalesChart";
import UsersGrowthDataChart from "./_components/UsersGrowthDataChart";
// ===========================================================
function AudienceAnalytics({
  totalAudiences,
  activeCustomers,
  accountsWithoutPurchases,
  regionSalesData,
  usersCrowthData,
}: {
  totalAudiences: number;
  activeCustomers: number;
  accountsWithoutPurchases: number;
  regionSalesData: {
    name: string;
    value: number;
  }[];
  usersCrowthData: {
    month: string;
    value: number;
  }[];
}) {
  return (
    <>
      <KPI_Cards
        totalAudiences={totalAudiences}
        activeCustomers={activeCustomers}
        accountsWithoutPurchases={accountsWithoutPurchases}
      />
      <RegionSalesChart regionSalesData={regionSalesData} />
      <UsersGrowthDataChart usersCrowthData={usersCrowthData} />
    </>
  );
}

export default AudienceAnalytics;
