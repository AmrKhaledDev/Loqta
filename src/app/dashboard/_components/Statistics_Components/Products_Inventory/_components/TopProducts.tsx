"use client";
import Image from "next/image";
import { formatCurrency } from "@/lib/formates/formatCurrency";
import { AlertCircle, Trophy } from "lucide-react";
import Link from "next/link";
import { TopProductType } from "@/lib/types/types";
// ===================================================================
function TopProducts({ topProducts }: { topProducts: TopProductType[] }) {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="flex items-center gap-3 font-bold text-3xl justify-center">
        <Trophy className="text-yellow-500 size-11 p-2 bg-yellow-50 rounded-full shadow" />
        الأكثر مبيعاً
      </h2>
      {topProducts.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3">
          {topProducts.map((item) => (
            <li
              key={item.id}
              className="ring shadow-2xl hover:scale-102 mytransition ring-gray-50/20 bg-white/10 p-5 rounded-2xl flex items-center gap-3"
            >
              <Image
                src={item.product.productImages[0].image}
                alt={item.product.name}
                width={300}
                height={300}
                className="bg-white p-2 size-30 rounded-2xl object-contain"
              />
              <div className="space-y-2">
                <Link
                  target="_blank"
                  href={`/product/${item.id}`}
                  className="text-xl line-clamp-1 font-semibold block hover:underline text-cyan-400"
                >
                  {item.product.name}
                </Link>
                <p className="flex items-center gap-2 text-gray-300 font-normal">
                  إجمالي الكمية المباعة :
                  <span className="size-7 flex items-center justify-center text-white ring ring-gray-50/10  font-bold bg-black/10 rounded-full shadow">
                    {item.totalQty}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-gray-300 font-normal">
                  إجمالي البيع :
                  <span className="text-[18px] font-extrabold text-emerald-400">
                    {formatCurrency.format(item.totalRevenue)}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-yellow-600 flex items-center gap-2 border border-yellow-600 mx-auto font-semibold w-fit px-10 rounded text-xs py-1.5 text-center">
          <AlertCircle className="size-4.5" />
         لا يوجد منتجات حالياً
        </p>
      )}
    </div>
  );
}

export default TopProducts;
