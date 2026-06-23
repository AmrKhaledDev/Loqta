import { ProductDbType } from "@/lib/types/types";
import Image from "next/image";
// ====================================
function ProductOfferImage({ product }: { product: ProductDbType }) {
  return (
    <div className="relative aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center">
      <Image
        src={product.productImages[0].image}
        alt="product image"
        fill
        className="object-contain "
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        priority
      />
    </div>
  );
}

export default ProductOfferImage;
