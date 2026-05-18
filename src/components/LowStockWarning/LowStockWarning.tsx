import { ProductDbType } from "@/lib/types/types";
// ==================================================
function LowStockWarning({ product }: { product: ProductDbType }) {
  const formatStockCount = (num: number) => {
    if (num == 1) return "قطعة واحدة";
    if (num == 2) return "قطعتان";
    if (num >= 3 && num <= 10) return `${num} قطع`;
    return `${num} قطعة`;
  };
  return (
    <>
      {product.stock <= product.min_stock && product.stock !== 0 && (
        <p className="text-red-500 font-bold text-xs animate-pulse">
          من هذا المنتج متبقي {formatStockCount(product.stock)} فقط
        </p>
      )}
    </>
  );
}

export default LowStockWarning;
