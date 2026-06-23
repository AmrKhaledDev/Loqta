import { formatCurrency } from "@/lib/formates/formatCurrency";
import { OrderDbType } from "@/lib/types/types";
import Image from "next/image";
// ===========================================================
function OrderProducts({currentOrder}:{currentOrder:OrderDbType}) {
  return (
    <ul className="grid grid-cols-2 sm:gap-3 gap-1.5">
      {currentOrder.items.map((item) => (
        <li
          key={item.id}
          className="flex gap-3 ring ring-gray-50/10 bg-white/5 p-2 rounded-2xl shadow md:flex-row flex-col"
        >
          <Image
            src={item.product.productImages[0].image}
            alt={item.product.name}
            width={400}
            height={400}
            className="xl:size-25 size-22 shadow p-2 bg-white rounded-2xl object-contain shrink-0"
          />
          <div className="flex flex-col gap-1">
            {item.product.isDeleted && <p className="text-sm font-extrabold text-red-500">منتج محذوف</p>}
            <h2 className="line-clamp-2 font-bold xl:text-[18px] sm:text-[15px] text-xs">
              {item.product.name}
            </h2>
            <p className="text-gray-300 font-normal flex items-center gap-2 sm:text-[15px] text-xs">
              سعر المنتج :
              <span className="font-extrabold sm:text-xl text-[15px] text-green-400">
                {formatCurrency.format(item.priceAtAdd)}
              </span>
            </p>
            <p className="text-gray-300 font-normal flex items-center gap-2 sm:text-[15px] text-xs">
              كمية المنتج :
              <span className="sm:size-6 size-5 flex items-center font-extrabold justify-center rounded-full ring ring-gray-50/20 bg-white/10">
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
