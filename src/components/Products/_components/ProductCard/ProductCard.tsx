import { ProductDbType } from "@/lib/types/types";
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
    <div
      title={product.name}
      className="sm:p-5 relative p-2 rounded-2xl shadow-xl flex flex-col justify-between sm:gap-3 gap-2 ring ring-gray-50/20 bg-white/5 hover:shadow-2xl hover:scale-102 mytransition"
    >
      <div className="relative aspect-square bg-white rounded-2xl overflow-hidden">
        <Image
          src={product.productImages[0].image}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority
        />
      </div>
      <Link
        href={product.stock > 0 ? `/product/${product.id}` : ""}
        className={`md:line-clamp-1 sm:line-clamp-2 line-clamp-3 ${product.stock > 0 ? "hover:underline" : "cursor-default"} font-semibold sm:text-[15px] text-sm`}
      >
        {product.name}
      </Link>
      <p className="sm:text-sm text-xs text-gray-300 md:line-clamp-2 sm:line-clamp-3 line-clamp-4 ">
        {product.description}
      </p>
      <ProductCardFooter userSession={userSession} product={product} />
      <LowStockWarning product={product} />
      {product.stock > 0 && product.isOnSale && (
        <span className="absolute top-2 shadow right-2 bg-red-100 text-red-500 py-1 sm:px-3 px-2 rounded-full font-extrabold sm:text-xs text-[10px]">
          خصم {discountPercentage}%
        </span>
      )}
    </div>
  );
}

export default ProductCard;
