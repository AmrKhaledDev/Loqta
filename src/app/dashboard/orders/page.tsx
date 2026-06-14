import { getOrders } from "@/lib/Db/PublicCaches/getOrders";
import OrdersPageContent from "./_componnets/OrdersPageContent";
// ========================================================================
async function Orders() {
  const orders = await getOrders();
  return (
    <main className="flex flex-col gap-10 w-full">
      <h2 className="font-black text-3xl">إدارة الطلبات</h2>
      <OrdersPageContent orders={orders} />
    </main>
  );
}

export default Orders;
