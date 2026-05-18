import { ProductDbType } from "@/lib/types/types";
// ==============================================
function ProductStats({ product }: { product: ProductDbType }) {
  const rating = product.opinions.reduce((acc, r) => acc + r.rating, 0);
  const stats = [
    { id: "1", icon: "🖼️", value: `${product.productImages.length}  صورة` },
    { id: "2", icon: "⭐️", value: `${rating}  تقييم` },
    { id: "3", icon: "🗨️", value: `${product.opinions.length}  رأي` },
  ];
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="w-full h-px block bg-white/5 rounded-full" />
      <div className="flex items-center gap-4">
        {stats.map((state) => (
          <span key={state.id} className="text-xs">
            {state.icon}
            <span className="text-gray-400">{state.value}</span>
          </span>
        ))}
      </div>
      <span className="w-full h-px block bg-white/5 rounded-full" />
    </div>
  );
}

export default ProductStats;
