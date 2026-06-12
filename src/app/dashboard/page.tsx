import { getTotalSales } from "@/lib/Db/getTotalSales";
import StatisticsContent from "./_components/Statistics_Components/StatisticsContent";
import { getOrdersCount } from "@/lib/Db/getOrdersCount";
import { getNewCustomers } from "@/lib/Db/getNewCustomers";
import { getActiveProductsCount } from "@/lib/Db/getActiveProductsCount";
// ========================================================================================
async function page() {
  const totalSales = await getTotalSales();
  const ordersCount = await getOrdersCount();
  const newCustomers = await getNewCustomers();
  const activeProducts = await getActiveProductsCount();
  return (
    <main className="flex-1 flex flex-col gap-15">
      <h2 className="font-black text-3xl">الإحصائيات</h2>
      <StatisticsContent
        totalSales={totalSales}
        ordersCount={ordersCount}
        newCustomers={newCustomers}
        activeProducts={activeProducts}
      />
    </main>
  );
}

export default page;
