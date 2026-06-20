import { getTotalSales } from "@/lib/Db/OverviewCaches/getTotalSales";
import StatisticsContent from "./_components/Statistics_Components/StatisticsContent";
import { getOrdersCount } from "@/lib/Db/OverviewCaches/getOrdersCount";
import { getNewCustomers } from "@/lib/Db/OverviewCaches/getNewCustomers";
import { getActiveProductsCount } from "@/lib/Db/OverviewCaches/getActiveProductsCount";
import { getTotalInventory } from "@/lib/Db/Products_InventoryCaches/getTotalInventory";
import { getProductsLowStock } from "@/lib/Db/Products_InventoryCaches/getProductsLowStock";
import { getProductOutOfStock } from "@/lib/Db/Products_InventoryCaches/getProductOutOfStock";
import { getTopProducts } from "@/lib/Db/Products_InventoryCaches/getTopProducts";
import { getStagnantProducts } from "@/lib/Db/Products_InventoryCaches/getStagnantProducts";
import { getTotalAudiences } from "@/lib/Db/AudienceAnalyticsCaches/getTotalAudiences";
import { getActiveCustomers } from "@/lib/Db/AudienceAnalyticsCaches/getActiveCustomers";
import { getAccountsWithoutPurchases } from "@/lib/Db/AudienceAnalyticsCaches/getAccountsWithoutPurchases";
import { getMonthlyRevenueData } from "@/lib/Db/OverviewCaches/getMonthlyRevenueData";
import { getCategorySalesData } from "@/lib/Db/OverviewCaches/getCategorySalesData";
import { getRegionSalesData } from "@/lib/Db/AudienceAnalyticsCaches/getRegionSalesData";
// ========================================================================================
async function page() {
  // Overview
  const totalSales = await getTotalSales();
  const ordersCount = await getOrdersCount();
  const newCustomers = await getNewCustomers();
  const activeProducts = await getActiveProductsCount();
  const monthlyRevenueData = await getMonthlyRevenueData();
  // Products & Inventory
  const totalInventory = await getTotalInventory();
  const productsLowStock = await getProductsLowStock();
  const productOutOfStock = await getProductOutOfStock();
  const topProducts = await getTopProducts();
  const stagnantProducts = await getStagnantProducts();
  // AudiencesAnalytics
  const totalAudiences = await getTotalAudiences();
  const activeCustomers = await getActiveCustomers();
  const accountsWithoutPurchases = await getAccountsWithoutPurchases();
  const categorySalesData = await getCategorySalesData()
  const regionSalesData = await getRegionSalesData()
  return (
    <main className="flex-1 flex flex-col lg:gap-35 md:gap-25 sm:gap-20 gap-15">
      <StatisticsContent
        totalSales={totalSales}
        ordersCount={ordersCount}
        newCustomers={newCustomers}
        activeProducts={activeProducts}
        totalInventory={totalInventory}
        productsLowStock={productsLowStock}
        productOutOfStock={productOutOfStock}
        topProducts={topProducts}
        stagnantProducts={stagnantProducts}
        totalAudiences={totalAudiences}
        activeCustomers={activeCustomers}
        accountsWithoutPurchases={accountsWithoutPurchases}
        monthlyRevenueData={monthlyRevenueData}
        categorySalesData={categorySalesData}
        regionSalesData={regionSalesData}
      />
    </main>
  );
}

export default page;
