import { formatCurrency } from "@/lib/formatCurrency";
import { CreditCard } from "lucide-react";
import Link from "next/link";
// ====================================================
function TotalPrice({ totalPrice }: { totalPrice: number }) {
  return (
    <div className="p-5 rounded-2xl shadow-xl flex items-center justify-between gap-5 ring ring-gray-50/20 bg-white/5 text-[17px]">
      <h2 className="font-extrabold flex items-center gap-4">
        المجموع الكلي :
        <span className="text-white ring ring-gray-50/20 shadow bg-white/5 py-2 px-6 rounded-md font-extrabold text-xl">
          {formatCurrency.format(totalPrice)}
        </span>
      </h2>
      <Link
        href={"/order"}
        className="bg-linear-to-r hover:scale-103 active:scale-90 mytransition from-indigo-500 to-pink-500 py-3 px-4 rounded-md shadow font-semibold flex items-center gap-2 cursor-pointer"
      >
        متابعة الشراء <CreditCard />
      </Link>
    </div>
  );
}

export default TotalPrice;
