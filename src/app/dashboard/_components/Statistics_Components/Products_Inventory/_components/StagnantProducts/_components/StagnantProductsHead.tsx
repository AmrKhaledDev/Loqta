import { TrendingDown } from "lucide-react";
// =======================================================
function StagnantProductsHead() {
  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="flex items-center gap-3 font-bold text-3xl justify-center">
        <TrendingDown className="text-red-500 size-12 p-2 bg-red-100 rounded-full shadow" />
        المنتجات الراكدة
      </h2>
      <p className="font-normal text-gray-400">
        المنتجات الأكثر ركوداً في المخزن والتي تحتاج إلى تنشيط مبيعاتها
      </p>
    </div>
  );
}

export default StagnantProductsHead;
