import Image from "next/image";
import ProductStats from "./_components/ProductStats";
import ProductFooter from "./_components/ProductFooter";
import { Dispatch, SetStateAction } from "react";
import { ProductDbType } from "@/lib/types/types";
import ProductActions from "./_components/ProductActions";
// =========================================
function ProductsGrid({
  products,
  setActionType,
  setEditProduct,
}: {
  products: ProductDbType[];
  setActionType: Dispatch<SetStateAction<"create" | "edit" | null>>;
  setEditProduct: Dispatch<SetStateAction<ProductDbType | null>>;
}) {
  return (
    <ul className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:gap-3 gap-1">
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
            className="xl:p-4 sm:p-3 p-1 group relative rounded-2xl ring ring-gray-50/20 bg-white/5 flex flex-col gap-4"
          >
            <Image
              src={product.productImages[0].image}
              alt={product.name}
              width={100}
              height={100}
              className="object-contain rounded-2xl bg-white w-full h-30"
            />
            <div className="flex xl:items-center xl:flex-row flex-col-reverse xl:gap-0 gap-2">
              <h2 className="font-bold xl:line-clamp-1 line-clamp-2 flex-1 text-xs">{product.name}</h2>
              <span className="bg-cyan-500/20 w-fit text-cyan-400 border border-cyan-500/30 text-nowrap py-px px-2 rounded-full shadow font-bold text-[10px]">
                {product.category.name}
              </span>
            </div>
            <p className="text-gray-300 line-clamp-3 text-xs">
              {product.description}
            </p>
            <ProductStats product={product} />
            <ProductFooter product={product} />
            {product.isOnSale && (
              <span className="absolute sm:top-2 top-1 sm:right-2 right-1 py-1 px-3 font-bold sm:text-xs text-[11px] bg-red-100 text-red-500 shadow rounded-full">
                عليه خصم <span>{discountPercentage}%</span>
              </span>
            )}
            <ProductActions
              setEditProduct={setEditProduct}
              setActionType={setActionType}
              product={product}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ProductsGrid;
