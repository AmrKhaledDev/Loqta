import { formatCurrency } from "@/lib/formatCurrency";
import { OrderDbType } from "@/lib/types/types";
import Image from "next/image";
// ===========================================================
function OrderProducts({currentOrder}:{currentOrder:OrderDbType}) {
  return (
    <ul className="grid grid-cols-2">
      {currentOrder.items.map((item) => (
        <li
          key={item.id}
          className="flex gap-3 ring ring-gray-50/10 bg-white/5 p-2 rounded-2xl shadow items-center"
        >
          <Image
            src={item.product.productImages[0].image}
            alt={item.product.name}
            width={400}
            height={400}
            className="size-30 shadow p-2 bg-white rounded-2xl object-contain"
          />
          <div className="flex flex-col gap-1">
            <h2 className="line-clamp-1 font-bold text-xl">
              {item.product.name}
            </h2>
            <p className="text-gray-300 font-normal flex items-center gap-2">
              سعر المنتج :
              <span className="font-extrabold text-xl text-green-400">
                {formatCurrency.format(item.priceAtAdd)}
              </span>
            </p>
            <p className="text-gray-300 font-normal flex items-center gap-2">
              كمية المنتج :
              <span className="size-6 flex items-center font-extrabold justify-center rounded-full ring ring-gray-50/20 bg-white/10">
                {item.quantity}
              </span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default OrderProducts;
