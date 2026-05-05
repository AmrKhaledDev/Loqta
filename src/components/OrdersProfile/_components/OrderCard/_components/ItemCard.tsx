import { formatCurrency } from "@/lib/formatCurrency";
import { UserProductDbType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
// ==============================================
function ItemCard({ item }: { item: UserProductDbType }) {
  return (
    <li>
      <Link
        href={`/product/${item.product.id}`}
        className="flex items-center relative gap-2 ring ring-gray-50/30 bg-white/10 rounded-lg p-2 hover:scale-102 mytransition"
      >
        <Image
          src={item.product.productImages[0].image}
          alt="product image"
          width={50}
          height={50}
          className="size-17 p-2 bg-white rounded-md object-contain"
        />
        <div>
          <h2 className="font-semibold text-sm">{item.product.name}</h2>
          <p className="line-clamp-1 text-xs text-gray-300">
            {item.product.description}
          </p>
          <p className="font-black text-cyan-400">
            {formatCurrency.format(item.priceAtAdd)}
          </p>
        </div>
        <span className="font-black p-1 size-5 flex items-center text-slate-700 justify-center text-sm  backdrop-blur rounded-full ring ring-gray-50/30 bg-white/5 absolute top-1 right-1">
          {item.quantity}
        </span>
      </Link>
    </li>
  );
}

export default ItemCard;
