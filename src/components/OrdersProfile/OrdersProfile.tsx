import { OrderDbType } from "@/lib/types/types";
import OrderCard from "./_components/OrderCard/OrderCard";
// =============================================
function OrdersProfile({orders}:{orders:OrderDbType[]}) {
  return (
    <div className="flex flex-col gap-10 lg:w-200 md:w-160 sm:w-140 text-white">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  );
}

export default OrdersProfile;
