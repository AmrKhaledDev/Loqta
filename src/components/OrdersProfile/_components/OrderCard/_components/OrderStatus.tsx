import { OrderDbType } from "@/lib/types";
import { ClockFading, Truck, CheckCircle, XCircle } from "lucide-react";
// ==================================================
function OrderStatus({ order }: { order: OrderDbType }) {
  const orderStatusMap: any = {
    PENDING: {
      label: "قيد الانتظار",
      icon: <ClockFading className="size-4.5" />,
    },
    CONFIRMED: {
      label: "تم التأكيد",
      icon: <CheckCircle className="size-4.5" />,
    },
    SHIPPED: {
      label: "تم الشحن",
      icon: <Truck className="size-4.5" />,
    },
    DELIVERED: {
      label: "تم التوصيل",
      icon: <CheckCircle className="size-4.5" />,
    },
    CANCELED: {
      label: "ملغي",
      icon: <XCircle className="size-4.5" />,
    },
  };
  const statusData = orderStatusMap[order.status];

  return (
    <h3 className="font-semibold flex items-center gap-2">
      حالة الطلب:
      <span className="font-bold bgg-ip py-1 px-4 text-xs rounded-full shadow animate-pulse flex items-center gap-1">
        {statusData.label}
        {statusData.icon}
      </span>
    </h3>
  );
}

export default OrderStatus;
