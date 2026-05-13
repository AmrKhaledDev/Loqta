import { ProductDbType } from "@/lib/types";
import ProductPrice from "./ProductPrice";
// ============================================
function ProductFooter({ product }: { product: ProductDbType }) {
  const formatQuantity = (num: number) => {
    if (num === 1) return `قطعة`;
    if (num === 2) return `قطعتين`;
    if (num <= 10) return `${num} قطع`;
    if (num > 10) return `${num} قطعة`;
    return "غير معروف";
  };
  return (
    <div>
      <h2 className="text-slate-500 italic">السعر</h2>
      <div className="flex items-center justify-between">
        <ProductPrice product={product} />
        <div>
          <p className="text-slate-500 text-xs">المخزون</p>
          <p className="text-green-400 font-black">
            {formatQuantity(product.stock)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductFooter;
