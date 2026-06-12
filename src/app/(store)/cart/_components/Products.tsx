import { formatCurrency } from "@/lib/formates/formatCurrency";
import ProductImage from "./ProductImage";
import ProductActions from "./ProductActions";
import { Prisma } from "@prisma/client";

// =============================================================
type Products = Prisma.UserProductGetPayload<{
  include: {
    product: {
      include: {
        productImages: true;
      };
    };
  };
}>;
function Products({ products }: { products: Products[] }) {
  return (
    <div className="flex flex-col gap-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-5 rounded-2xl sm:flex-row flex-col shadow-xl flex sm:items-center gap-5 ring ring-gray-50/20 bg-white/5 hover:shadow-2xl  mytransition"
        >
          <ProductImage
            image={product.product.productImages[0].image}
            alt={product.product.name}
          />
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="font-semibold sm:text-xl line-clamp-1">{product.product.name}</h2>
            <p className="text-gray-300 sm:text-[15px] text-sm font-normal line-clamp-2">
              {product.product.description}
            </p>
            <div className="flex items-center justify-between w-full sm:flex-nowrap flex-wrap gap-4">
              <p className="text-[#00d3f3] font-extrabold sm:text-xl">
                {formatCurrency.format(product.priceAtAdd)}
              </p>
              <ProductActions
                quantity={product.quantity}
                productId={product.id}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
