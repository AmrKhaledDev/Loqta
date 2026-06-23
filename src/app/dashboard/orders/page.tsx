import { getOrders } from "@/lib/Db/PublicCaches/getOrders";
import OrdersPageContent from "./_componnets/OrdersPageContent";
import { Metadata } from "next";
// ========================================================================
export const metadata: Metadata = {
  title: "لُقطة | الطلبات",
  description:
    "إدارة العمليات والطلبات الواردة، وتحديث حالات الشحن والدفع، مع متابعة تفاصيل الفواتير وبيانات العملاء أولاً بأول.",
};
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
