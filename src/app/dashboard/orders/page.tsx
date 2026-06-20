import { getOrders } from "@/lib/Db/PublicCaches/getOrders";
import OrdersPageContent from "./_componnets/OrdersPageContent";
// ========================================================================
async function Orders() {
  const orders = await getOrders();
  return (
    <main className="dashSectionStyle">
      <h2 className="dashSectionsHead">إدارة الطلبات</h2>
      <OrdersPageContent orders={orders} />
    </main>
  );
}

export default Orders;
