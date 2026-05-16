import ProfileProductCard from "@/components/ProfileProductCard/ProfileProductCard";
import { UserProductDbType } from "@/lib/types";
import Link from "next/link";
import { CreditCard } from "lucide-react";
// ================================================
function UserProductsInCart({ products }: { products: UserProductDbType[] }) {
  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-col gap-2">
        {products.map((p) => (
          <ProfileProductCard key={p.id} product={p} />
        ))}
      </ul>
      {products.length > 0 ? (
        <Link
          href={"/order"}
          className="w-fit font-bold flex hover:scale-105 mytransition hover:bg-white/15 hover:ring-gray-50/30 items-center gap-2 flex-row-reverse ring ring-gray-50/20 bg-white/5 rounded-md py-2 px-6 text-white"
        >
          <CreditCard />
          إتمام الشراء
        </Link>
      ) : (
        <Link
          href={"/categories"}
          className="ring ring-gray-50/20 py-2 px-6 rounded-md font-bold bg-white/5 text-white hover:scale-105 active:scale-95 mytransition"
        >
          إضافة منتجات للعربة
        </Link>
      )}
    </div>
  );
}

export default UserProductsInCart;
