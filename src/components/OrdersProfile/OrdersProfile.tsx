import { OrderDbType } from "@/lib/types";
import OrderCard from "./_components/OrderCard/OrderCard";
// =============================================
function OrdersProfile({orders}:{orders:OrderDbType[]}) {
  return (
    <div className="flex flex-col gap-10 w-200 text-white">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  );
}

export default OrdersProfile;
