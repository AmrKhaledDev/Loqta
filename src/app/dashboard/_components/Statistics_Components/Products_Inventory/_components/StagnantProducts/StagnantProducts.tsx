"use client";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/lib/formates/formatCurrency";
import { formatStock } from "@/lib/formates/formatStock";
import dayjs from "dayjs";
import TdTable from "@/components/TdTable/TdTable";
import { StagnantProduct } from "@/lib/types/types";
import StagnantProductsHead from "./_components/StagnantProductsHead";
import StagnantProductsThead from "./_components/StagnantProductsThead";
import DashWarnMessage from "@/app/dashboard/_components/DashWarnMessage";
// ==========================================================
function StagnantProducts({
  stagnantProducts,
}: {
  stagnantProducts: StagnantProduct[];
}) {
  return (
    <div className="flex flex-col gap-10">
      <StagnantProductsHead />
      {stagnantProducts.length > 0 ? (
        <div className="w-full rounded-2xl overflow-x-auto">
          <table className="bg-white/3 ring ring-gray-50/20 w-full">
            <StagnantProductsThead />
            <tbody>
              {stagnantProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className="text-center odd:bg-transparent hover:bg-black/20 mytransition even:bg-black/10"
                >
                  <TdTable>
                    <span className="font-extrabold text-xl">
                      {index + 1} #
                    </span>
                  </TdTable>
                  <TdTable>
                    <div className="flex items-center justify-center gap-2 flex-col">
                      <Image
                        src={product.productImages[0].image}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="p-px bg-white rounded-xl object-contain"
                      />
                      <h2 dir="auto" className=" text-sm line-clamp-1">
                        {product.name}
                      </h2>
                    </div>
                  </TdTable>
                  <TdTable>
                    <div className="flex items-center gap-2 justify-center">
                      <span className="p-1 size-7 rounded-full flex items-center justify-center font-extrabold bg-black/10 ring ring-gray-50/15">
                        {product.stock}
                      </span>
                      <span className="font-semibold">
                        {formatStock(product.stock)}
                      </span>
                    </div>
                  </TdTable>
                  <TdTable>
                    <span className="font-bold text-emerald-300 text-[18px]">
                      {formatCurrency.format(product.price)}
                    </span>
                  </TdTable>
                  <TdTable>
                    <span className="font-extrabold text-cyan-400">
                      {product.salesCount}
                    </span>
                  </TdTable>
                  <TdTable>
                    <span className="font-bold font-mono">
                      {dayjs(product.createdAt).format("D/M/YYYY")}
                    </span>
                  </TdTable>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
       <DashWarnMessage message=" حالياً لا يوجد منتجات راكدة"/>
      )}
    </div>
  );
}

export default StagnantProducts;
