"use client";

import KPI_Cards from "./_components/KPI_Cards";
import RevenueChart from "./_components/RevenueChart";
import TopCategoriesSales from "./_components/TopCategoriesSales";
// ========================================================================
function Overview({
  totalSales,
  ordersCount,
  newCustomers,
  activeProducts,
  monthlyRevenueData,
  categorySalesData,
}: {
  totalSales: number;
  ordersCount: number;
  newCustomers: number;
  activeProducts: number;
  monthlyRevenueData: { month: string; revenue: number }[];
  categorySalesData: { name: string; value: number }[];
}) {
  return (
    <>
      <KPI_Cards
        totalSales={totalSales}
        ordersCount={ordersCount}
        newCustomers={newCustomers}
        activeProducts={activeProducts}
      />
      <RevenueChart chartData={monthlyRevenueData} />
      <TopCategoriesSales categorySalesData={categorySalesData} />
    </>
  );
}

export default Overview;
