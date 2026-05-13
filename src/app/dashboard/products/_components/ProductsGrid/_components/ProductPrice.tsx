import { formatCurrency } from "@/lib/formatCurrency";
import { ProductDbType } from "@/lib/types";
// =====================================
function ProductPrice({product}:{product:ProductDbType}) {
  return (
    <div className="flex items-center gap-2">
      <p className="font-bold text-[17px]">
        {formatCurrency.format(
          product.discountPrice ? product.discountPrice : product.price,
        )}
      </p>
      {product.discountPrice && (
        <p className="text-slate-500 text-sm line-through font-normal">
          {formatCurrency.format(product.price)}
        </p>
      )}
    </div>
  );
}

export default ProductPrice;
