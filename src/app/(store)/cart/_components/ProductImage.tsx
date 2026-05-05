import Image from "next/image";
// ======================================
function ProductImage({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="ring ring-gray-50/30 bg-white/5 p-3 rounded-md">
      <div className="relative size-40 p-3 bg-white rounded shadow overflow-hidden hover:scale-105 mytransition ">
        <Image src={image} alt={alt} fill className="object-contain" />
      </div>
    </div>
  );
}

export default ProductImage;
