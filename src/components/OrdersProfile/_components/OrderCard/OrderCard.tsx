import { OrderDbType } from "@/lib/types";
import dayjs from "dayjs";
import OrderTotal from "./_components/OrderTotal";
import Items from "./_components/Items";
import OrderCustomerInfo from "./_components/OrderCustomerInfo";
import OrderStatus from "./_components/OrderStatus";
// ======================================================
function OrderCard({ order }: { order: OrderDbType }) {
  return (
    <div className="p-4 rounded-lg relative pt-7 bg-white/5 ring ring-gray-50/20 w-full flex flex-col gap-2">
      <span className="text-xs font-semibold tracking-wider absolute -top-3 -right-1 ring ring-gray-50/20 bg-white/5 backdrop-blur py-1 px-4 rounded-full">
        {dayjs(order.createdAt).format("D/M/YYYY")}
      </span>
      <h4 className="font-semibold text-sm">
        رقم الطلب: <span className="font-bold">{order.order_num}#</span>
      </h4>
      <OrderStatus order={order} />
      <OrderCustomerInfo order={order} />
      <Items items={order.items} />
      <OrderTotal totalPrice={Number(order.totalPrice)} />
    </div>
  );
}

export default OrderCard;
