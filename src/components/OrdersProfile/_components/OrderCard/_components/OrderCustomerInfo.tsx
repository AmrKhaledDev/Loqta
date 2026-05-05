import { OrderDbType } from "@/lib/types";
// =========================================================
function OrderCustomerInfo({order}:{order:OrderDbType}) {
  const customerInfo = [
    { id: "name", label: "صاحب الطلب:", value: order.fullName },
    { id: "phone", label: "رقم صاحب الطلب:", value: order.phone },
    { id: "city", label: "محافظة صاحب الطلب:", value: order.city },
  ];
  return (
    <div className="flex flex-col gap-2 font-semibold">
      تفاصيل أُخرى:
      <div className="flex items-center gap-3">
        {customerInfo.map((item) => (
          <h2
            key={item.id}
            className="text-xs font-semibold flex items-center gap-1"
          >
            {item.label}
            <span className="py-1 rounded-full text-xs px-4 bg-white/5 ring ring-gray-50/20">
              {item.value}
            </span>
          </h2>
        ))}
      </div>
    </div>
  );
}

export default OrderCustomerInfo;
