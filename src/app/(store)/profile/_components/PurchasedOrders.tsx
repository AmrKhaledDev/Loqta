import OrdersProfile from "@/components/OrdersProfile/OrdersProfile";
import { OrderDbType } from "@/lib/types";
// ============================================================
function PurchasedOrders({ orders }: { orders: OrderDbType[] }) {
  return (
    <div>
      <OrdersProfile orders={orders} />
    </div>
  );
}

export default PurchasedOrders;
