import Image from "next/image";
import { ProductDbType } from "@/lib/types";
import ProductStats from "./_components/ProductStats";
import ProductFooter from "./_components/ProductFooter";
import ProductEdit from "./_components/ProductEdit";
import { Dispatch, SetStateAction } from "react";
// =========================================
function ProductsGrid({
  products,
  setActionType,
  setProduct,
}: {
  products: ProductDbType[];
  setActionType: Dispatch<SetStateAction<"create" | "edit" | null>>;
  setProduct: Dispatch<SetStateAction<ProductDbType | null>>;
}) {
  return (
    <ul className="grid grid-cols-4 gap-3">
      {products.map((product) => {
        let discountPercentage = null;
        if (
          product.discountPrice &&
          product.isOnSale &&
          product.price > product.discountPrice
        ) {
          discountPercentage = Math.round(
            ((product.price - product.discountPrice) / product.price) * 100,
          );
        }
        return (
          <li
            key={product.id}
            className="p-4 group relative rounded-2xl ring ring-gray-50/20 bg-white/5 flex flex-col gap-4"
          >
            <Image
              src={product.productImages[0].image}
              alt={product.name}
              width={100}
              height={100}
              className="object-contain rounded-2xl bg-white w-full h-30"
            />
            <div className="flex items-center">
              <h2 className="font-bold line-clamp-1 flex-1">{product.name}</h2>
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-nowrap py-1 px-3 rounded-full shadow font-bold text-[10px]">
                {product.category.name}
              </span>
            </div>
            <p className="text-gray-300 line-clamp-3 text-xs">
              {product.description}
            </p>
            <ProductStats product={product} />
            <ProductFooter product={product} />
            <span className="absolute top-2 right-2 py-1 px-3 font-bold text-xs bg-red-100 text-red-500 shadow rounded-full">
              عليه خصم <span>{discountPercentage}%</span>
            </span>
            <ProductEdit
              product={product}
              setActionType={setActionType}
              setProduct={setProduct}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ProductsGrid;
