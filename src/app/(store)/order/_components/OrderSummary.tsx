import { formatCurrency } from "@/lib/formatCurrency";
import { UserSessionWithRelations } from "@/lib/types";
// ================================================================
function OrderSummary({
  userSession,
}: {
  userSession: UserSessionWithRelations;
}) {
  const subTotal = userSession.userProducts.reduce(
    (acc, p) => acc + p.priceAtAdd * p.quantity,
    0,
  );
  const TAX_RATE = 0.14;
  const SHIPPING_FEE = 50;
  const taxPrice = subTotal * TAX_RATE;
  const finalTotal = subTotal + taxPrice + SHIPPING_FEE;
  const orderSummary = [
    { id: "TAX_RATE", label: "الضريبة :", value: "14%" },
    {
      id: "SHIPPING_FEE",
      label: "مصاريف الشحن :",
      value: formatCurrency.format(SHIPPING_FEE),
    },
  ];
  return (
    <div className=" p-4 rounded-md flex flex-col gap-3">
      {orderSummary.map((s) => (
        <h2
          key={s.id}
          className="text-sm font-semibold flex items-center gap-2"
        >
          {s.label}
          <span className="font-semibold text-sm ring ring-gray-50/20 bg-white/5 rounded-full py-1 px-6">
            {s.value}
          </span>
        </h2>
      ))}
      <div className="flex items-center gap-3">
        <p>
          المجموع الكُلي
          <span className="text-xs mr-1 font-semibold">
            (شامل الضريبة ومصاريف الشحن)
          </span>
          :
        </p>
        <span className="font-semibold text-xl ring ring-gray-50/20 bg-white/5 rounded-full py-2 px-6 shadow">
          {formatCurrency.format(subTotal ? Number(finalTotal) : 0)}
        </span>
      </div>
    </div>
  );
}

export default OrderSummary;
