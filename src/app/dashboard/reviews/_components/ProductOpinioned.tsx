import { OpinionDBType } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";
// ==========================================================================
function ProductOpinioned({opinion}:{opinion:OpinionDBType}) {
  return (
    <div className="lg:p-3 p-1.5 bg-white/10 rounded-md mb-2 flex flex-col gap-3">
      <div className="flex justify-between gap-2 xl:flex-nowrap flex-wrap">
        <Image
          src={opinion.product.productImages[0].image}
          alt="product image"
          width={200}
          height={200}
          className="object-contain p-1 bg-white rounded-md lg:size-20 size-18"
        />
        <Link
          className="text-blue-400 text-[10px] hover:underline h-fit"
          href={`/product/${opinion.product.id}`}
        >
          الذهاب لصفحة المنتج
        </Link>
      </div>
      <h3 className="text-[10px] font-semibold text-gray-300 lg:line-clamp-1 line-clamp-2">
        {opinion.product.name}
      </h3>
    </div>
  );
}

export default ProductOpinioned;
