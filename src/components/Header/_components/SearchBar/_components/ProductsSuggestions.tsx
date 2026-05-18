import { ProductDbType } from "@/lib/types/types";
import { Search } from "lucide-react";
import Link from "next/link";
// ==============================================
function ProductsSuggestions({ products }: { products: ProductDbType[] }) {
  return (
    <div>
      {products.length > 0 && (
        <>
          <h2 className="text-gray-500 text-xs pr-3">اقتراحات المنتجات</h2>
          <ul className="sm:h-30 h-35 overflow-y-auto">
            {products.map((product) => (
              <li key={product.id}>
                <Link dir="auto"
                  href={`/product/${product.id}`}
                  className="hover:bgg-ip flex items-center gap-2 sm:p-3 p-2 sm:text-sm text-xs hover:text-white"
                >
                  <Search className="text-gray-200 size-4.5" /> <span className="line-clamp-1">{product.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ProductsSuggestions;
