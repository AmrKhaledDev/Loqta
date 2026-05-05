import { formatCurrency } from "@/lib/formatCurrency";
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
          className="p-5 rounded-2xl shadow-xl flex items-center gap-5 ring ring-gray-50/20 bg-white/5 hover:shadow-2xl  mytransition"
        >
          <ProductImage
            image={product.product.productImages[0].image}
            alt={product.product.name}
          />
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="font-semibold text-xl">{product.product.name}</h2>
            <p className="text-gray-300 font-normal">
              {product.product.description}
            </p>
            <div className="flex items-center justify-between w-full">
              <p className="text-[#00d3f3] font-extrabold text-xl">
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
