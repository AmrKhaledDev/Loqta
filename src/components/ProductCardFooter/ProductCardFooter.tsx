"use client";

import ButtonAddToCart from "@/components/ButtonAddToCart/ButtonAddToCart";
import { formatCurrency } from "@/lib/formates/formatCurrency";
import { ProductDbType } from "@/lib/types/types";
import { User } from "@prisma/client";
// ============================================
function ProductCardFooter({
  product,
  userSession,
}: {
  product: ProductDbType;
  userSession: User | null;
}) {
  return (
    <div className="flex sm:items-center sm:flex-row flex-col-reverse justify-between  gap-2">
      {product.stock > 0 ? (
        <>
          <ButtonAddToCart userSession={userSession} productId={product.id} />
          <div className="flex flex-col sm:items-end">
            <p
              className={`text-[#00d3f3] font-extrabold sm:text-[15px] text-sm ${product.isOnSale && "line-through text-gray-400"}`}
            >
              {formatCurrency.format(product.price)}
            </p>
            {product.discountPrice && (
              <p className="text-[#00d3f3] font-extrabold sm:text-[18px]">
                {formatCurrency.format(product.discountPrice)}
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="text-red-400 font-bold">لم يعد متوفر حاليًا</p>
      )}
    </div>
  );
}

export default ProductCardFooter;
