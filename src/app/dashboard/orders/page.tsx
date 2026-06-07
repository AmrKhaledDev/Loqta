import { getOrders } from "@/lib/Db/getOrders";
import OrdersPageContent from "./_componnets/OrdersPageContent";
// ========================================================================
async function Orders() {
  const orders = await getOrders();
  return (
    <main className="flex flex-col gap-10">
      <h2 className="font-black text-3xl">إدارة الطلبات</h2>
      <OrdersPageContent orders={orders} />
    </main>
  );
}

export default Orders;
