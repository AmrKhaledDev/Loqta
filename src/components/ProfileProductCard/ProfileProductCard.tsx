import { formatCurrency } from "@/lib/formatCurrency";
import { UserProductDbType } from "@/lib/types";
import Image from "next/image";
// =====================================

function ProfileProductCard({ product }: { product: UserProductDbType }) {
  return (
    <li className="flex max-w-200 sm:flex-row flex-col gap-3 bg-white/5 ring ring-gray-50/20 py-3 pl-10 pr-3 rounded-md text-white">
      <Image
        src={product.product.productImages[0].image}
        alt="product image"
        width={111}
        height={111}
        className="md:size-45 size-37 object-contain md:py-3 py-2 md:px-10 px-6 bg-white rounded-md"
      />
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-[17px]">{product.product.name}</h2>
        <p className="text-gray-400 text-sm line-clamp-2">{product.product.description}</p>
        <p className="font-bold text-cyan-300 text-xl">
          {formatCurrency.format(product.priceAtAdd)}
        </p>
        <div className="flex items-center gap-2">
          <p>الكمية : </p>
          <p className="size-6 flex items-center justify-center rounded-full ring ring-gray-50/20 bg-white/5 text-sm">
            {product.quantity}
          </p>
        </div>
      </div>
    </li>
  );
}

export default ProfileProductCard;
