import { ProductDbType } from "@/lib/types";
import Image from "next/image";
import { User } from "@prisma/client";
import Link from "next/link";
import LowStockWarning from "@/components/LowStockWarning/LowStockWarning";
import ProductCardFooter from "@/components/ProductCardFooter/ProductCardFooter";
// ========================================================================
function ProductCard({
  product,
  userSession,
}: {
  product: ProductDbType;
  userSession: User | null;
}) {
  let discountPercentage = null;
  if (
    product.price &&
    product.discountPrice &&
    product.price > product.discountPrice
  ) {
    discountPercentage = Math.round(
      ((product.price - product.discountPrice) / product.price) * 100,
    );
  }

  return (
    <div title={product.name} className="sm:p-5 relative p-3 rounded-2xl shadow-xl flex flex-col justify-between gap-3 ring ring-gray-50/20 bg-white/5 hover:shadow-2xl hover:scale-102 mytransition">
      <div className="relative aspect-square bg-white rounded-2xl overflow-hidden">
        <Image
          src={product.productImages[0].image}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <Link
        href={product.stock > 0 ? `/product/${product.id}` : ""}
        className={`sm:line-clamp-1 line-clamp-2 ${product.stock > 0 ? "hover:underline" : "cursor-default"} font-semibold sm:text-[15px] text-sm`}
      >
        {product.name}
      </Link>
      <p className="sm:text-sm text-xs text-gray-300 sm:line-clamp-2 line-clamp-3 ">
        {product.description}
      </p>
      <ProductCardFooter userSession={userSession} product={product} />
      <LowStockWarning product={product} />
      {product.stock > 0 && (
        <span className="absolute top-1 shadow left-1 bg-red-500 py-1 px-3 rounded-full font-extrabold text-xs">
          خصم {discountPercentage}%
        </span>
      )}
    </div>
  );
}

export default ProductCard;
