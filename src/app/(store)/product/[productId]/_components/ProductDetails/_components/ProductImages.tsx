"use client"
import { ProductDbType } from "@/lib/types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
// ========================================
function ProductImages({
  product,
  setProductImage,
}: {
  product: ProductDbType;
  setProductImage: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      {product.productImages.map((image) => (
        <Image
          onClick={() => setProductImage(image.image)}
          key={image.id}
          src={image.image}
          alt="product image"
          width={50}
          height={50}
          className="object-contain size-20 bg-white rounded-lg cursor-pointer"
        />
      ))}
    </div>
  );
}

export default ProductImages;
