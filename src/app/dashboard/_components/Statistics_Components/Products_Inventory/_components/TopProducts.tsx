"use client";
import Image from "next/image";
import { formatCurrency } from "@/lib/formates/formatCurrency";
import { AlertCircle, Trophy } from "lucide-react";
import Link from "next/link";
import { TopProductType } from "@/lib/types/types";
import { formatProductsCount } from "@/lib/formates/formatProductsCount";
// ===================================================================
function TopProducts({ topProducts }: { topProducts: TopProductType[] }) {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="flex items-center gap-3 font-bold md:text-3xl sm:text-2xl text-xl justify-center">
        <Trophy className="text-yellow-500 md:size-11 size-9 p-2 bg-yellow-50 rounded-full shadow" />
        الأكثر مبيعاً
      </h2>
      {topProducts.length > 0 ? (
        <ul className="grid sm:grid-cols-2 gap-3">
          {topProducts.map((item) => (
            <li
              key={item.id}
              className="ring shadow-2xl sm:items-start items-center sm:flex-row flex-col hover:scale-102 mytransition ring-gray-50/20 bg-white/10 xl:p-5 p-3 rounded-2xl flex gap-3"
            >
              <Image
                src={item.product.productImages[0].image}
                alt={item.product.name}
                width={300}
                height={300}
                className="bg-white p-2 xl:size-30 sm:size-25 size-35 rounded-2xl object-contain"
              />
              <div className="md:space-y-2 space-y-1">
                <Link
                  target="_blank"
                  href={`/product/${item.id}`}
                  className="xl:text-xl text-center sm:text-start sm:text-sm text-[16px] line-clamp-1 font-semibold block hover:underline text-cyan-400"
                >
                  {item.product.name}
                </Link>
                <p className="flex items-center sm:justify-start justify-center flex-wrap md:text-[15px] sm:text-sm text-[16px] xl:gap-2 gap-1 text-gray-300 font-normal">
                  إجمالي الكمية المباعة :
                  <span className="flex items-center justify-center xl:text-[15px] text-xs py-1 px-3 text-white ring ring-gray-50/10  font-semibold bg-black/10 rounded-full shadow">
                    {formatProductsCount(item.totalQty)}
                  </span>
                </p>
                <p className="flex items-center flex-wrap gap-2 sm:justify-start justify-center text-gray-300 font-normal md:text-[15px] sm:text-sm text-[16px]">
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
        <p className="text-yellow-600 flex items-center gap-2 border border-yellow-600 mx-auto font-semibold w-fit px-10 rounded-sm text-xs py-1.5 text-center">
          <AlertCircle className="size-4.5" />
         لا يوجد منتجات حالياً
        </p>
      )}
    </div>
  );
}

export default TopProducts;
