import { formatCurrency } from "@/lib/formatCurrency";
import { CreditCard } from "lucide-react";
import Link from "next/link";
// ====================================================
function TotalPrice({ totalPrice }: { totalPrice: number }) {
  return (
    <div className="p-5 rounded-2xl shadow-xl flex items-center sm:justify-between gap-5 sm:flex-nowrap flex-wrap justify-center ring ring-gray-50/20 bg-white/5 text-[17px]">
      <h2 className="font-extrabold sm:text-[15px] text-sm flex items-center sm:gap-4 gap-2">
        المجموع الكلي :
        <span className="text-white ring ring-gray-50/20 shadow bg-white/5 py-2 px-6 rounded-md font-extrabold sm:text-xl text-[15px]">
          {formatCurrency.format(totalPrice)}
        </span>
      </h2>
      <Link
        href={"/order"}
        className="bg-linear-to-r sm:text-[15px] text-xs hover:scale-103 active:scale-90 mytransition from-indigo-500 to-pink-500 py-3 px-6 rounded-md shadow font-semibold flex items-center gap-2 cursor-pointer"
      >
        متابعة الشراء <CreditCard className="sm:size-6 size-5"/>
      </Link>
    </div>
  );
}

export default TotalPrice;
