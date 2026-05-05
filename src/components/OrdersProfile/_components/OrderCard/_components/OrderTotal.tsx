import { formatCurrency } from '@/lib/formatCurrency'
// =========================================
function OrderTotal({totalPrice}:{totalPrice:number}) {
  return (
      <div className="flex items-center justify-between py-3 px-6 ring ring-gray-50/20 bg-white/5 rounded-lg mt-4">
        <h2 className="text-sm font-semibold">
          مجموع الطلب:
          <span className="text-xs font-bold">
            (شامل الضريبة مع مصاريف الشحن)
          </span>
        </h2>
        <p className="font-black text-cyan-400">
          {formatCurrency.format(totalPrice)}
        </p>
      </div>
  )
}

export default OrderTotal