import ProfileProductCard from "@/components/ProfileProductCard/ProfileProductCard";
import { UserProductDbType } from "@/lib/types";
import Link from "next/link";
import { CreditCard } from "lucide-react";
// ================================================
function UserProductsInCart({ products }: { products: UserProductDbType[] }) {
  return (
    <div className="flex flex-col gap-8">
      <ul>
        {products.map((p) => (
          <ProfileProductCard key={p.id} product={p} />
        ))}
      </ul>
      <Link
        href={"/order"}
        className="w-fit font-bold flex hover:scale-105 mytransition hover:bg-white/15 hover:ring-gray-50/30 items-center gap-2 flex-row-reverse ring ring-gray-50/20 bg-white/5 rounded-md py-2 px-6 text-white"
      >
        <CreditCard />
        إتمام الشراء
      </Link>
    </div>
  );
}

export default UserProductsInCart;
