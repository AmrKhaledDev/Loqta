import { getTotalSales } from "@/lib/Db/getTotalSales";
import StatisticsContent from "./_components/Statistics_Components/StatisticsContent";
import { getOrdersCount } from "@/lib/Db/getOrdersCount";
import { getNewCustomers } from "@/lib/Db/getNewCustomers";
import { getActiveProductsCount } from "@/lib/Db/getActiveProductsCount";
import { getTotalInventory } from "@/lib/Db/getTotalInventory";
import { getProductsLowStock } from "@/lib/Db/getProductsLowStock";
import { getProductOutOfStock } from "@/lib/Db/getProductOutOfStock";
import { getTopProducts } from "@/lib/Db/getTopProducts";
import { getStagnantProducts } from "@/lib/Db/getStagnantProducts";
// ========================================================================================
async function page() {
  // Overview
  const totalSales = await getTotalSales();
  const ordersCount = await getOrdersCount();
  const newCustomers = await getNewCustomers();
  const activeProducts = await getActiveProductsCount();
  // Products & Inventory
  const totalInventory = await getTotalInventory();
  const productsLowStock = await getProductsLowStock();
  const productOutOfStock = await getProductOutOfStock();
  const topProducts = await getTopProducts();
  const stagnantProducts=  await getStagnantProducts()
  return (
    <main className="flex-1 flex flex-col gap-35">
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
      />
    </main>
  );
}

export default page;
