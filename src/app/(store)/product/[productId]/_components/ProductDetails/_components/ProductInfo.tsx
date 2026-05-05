import { formatCurrency } from "@/lib/formatCurrency";
import { ProductDbType } from "@/lib/types";
import { CheckCircle2, CircleX } from "lucide-react";
import ProductCategory from "./ProductCategory";
// =============================================================
function ProductInfo({ product }: { product: ProductDbType }) {
  const infos = [
    { id: "warranty", name: "الضمان", des: product.warranty },
    { id: "returnPolicy", name: "سياسة الإرجاع", des: product.returnPolicy },
    { id: "shippingInfo", name: "التوصيل", des: product.shippingInfo },
  ];
  return (
    <>
      <h2 className="font-semibold text-4xl">{product.name}</h2>
      <p className="text-gray-300 font-normal text-sm">{product.description}</p>
      <p className="text-sm">
        في المخزون : <span className="font-bold">( {product.stock} )</span>
      </p>
      <p className="text-[#47b7e9] font-extrabold text-xl">
        {formatCurrency.format(product.price)}
      </p>
      {infos.map(
        (info) =>
          info.des && (
            <p key={info.id} className="flex items-center gap-2">
              {info.name} :
              <span className="font-bold text-sm bg-clip-text bg-linear-to-r from-pink-300 to-indigo-300 text-transparent">
                {info.des}
              </span>
            </p>
          ),
      )}
      {(product.isOriginal == true || product.isOriginal == false) && (
        <p
          className={`flex items-center font-extrabold text-sm gap-1 ${product.isOriginal ? "text-green-500" : " text-red-500"}`}
        >
          {product.isOriginal == true && (
            <>
              منتج أصلي <CheckCircle2 className="size-5" strokeWidth={3} />
            </>
          )}
          {product.isOriginal == false && (
            <>
              ليس منتج أصلي <CircleX className="size-5" strokeWidth={3} />
            </>
          )}
        </p>
      )}
      <ProductCategory category={product.category.name} />
    </>
  );
}

export default ProductInfo;
