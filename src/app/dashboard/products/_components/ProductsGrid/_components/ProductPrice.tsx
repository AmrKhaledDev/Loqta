import { formatCurrency } from "@/lib/formatCurrency";
import { ProductDbType } from "@/lib/types/types";
// =====================================
function ProductPrice({product}:{product:ProductDbType}) {
  return (
    <div className="flex items-center gap-2">
      <p dir="auto" className="font-bold text-[17px] line-clamp-1">
        {formatCurrency.format(
          product.discountPrice ? product.discountPrice : product.price,
        )}
      </p>
      {product.discountPrice && (
        <p dir="auto" className="text-slate-500 text-sm line-through font-normal line-clamp-1">
          {formatCurrency.format(product.price)}
        </p>
      )}
    </div>
  );
}

export default ProductPrice;
