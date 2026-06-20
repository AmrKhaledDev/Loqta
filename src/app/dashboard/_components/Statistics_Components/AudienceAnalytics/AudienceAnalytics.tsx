"use client";

import KPI_Cards from "./_components/KPI_Cards";
import RegionSalesChart from "./_components/RegionSalesChart";

// ===========================================================
function AudienceAnalytics({
  totalAudiences,
  activeCustomers,
  accountsWithoutPurchases,
  regionSalesData,
}: {
  totalAudiences: number;
  activeCustomers: number;
  accountsWithoutPurchases: number;
  regionSalesData: {
    name: string;
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
      <RegionSalesChart regionSalesData={regionSalesData}/>
    </>
  );
}

export default AudienceAnalytics;
