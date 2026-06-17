import Image from "next/image";
// =====================================================
function ProductImage({ image }: { image: string }) {
  return (
    <div className="relative md:size-100 sm:size-90 size-70 overflow-hidden bg-white rounded-md">
      <Image
        src={image}
        alt="product image"
        fill
        className="object-contain"
      />
    </div>
  );
}

export default ProductImage;
