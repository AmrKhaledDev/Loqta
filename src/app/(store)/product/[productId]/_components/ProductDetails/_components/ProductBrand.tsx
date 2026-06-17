import { ProductDbType } from "@/lib/types/types";
import { Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// ============================================
function ProductBrand({ product }: { product: ProductDbType }) {
  return (
    <div className="flex flex-col gap-2">
      {(product.brandLogoLink || product.brandLogoImage) && (
        <Image
          src={
            product.brandLogoIsImage
              ? product.brandLogoImage || ""
              : product.brandLogoLink || ""
          }
          alt="brand logo"
          width={130}
          height={130}
          className="md:w-55 sm:w-50 w-45"
        />
      )}
      {product.brandWebsite && (
        <Link
          target="_blank"
          className="text-blue-300 text-xs hover:underline font-semibold flex items-center gap-1"
          href={product.brandWebsite}
        >
          <Link2 className="size-5" />
          زيارة الموقع الرسمي للعلامة التجارية
        </Link>
      )}
    </div>
  );
}

export default ProductBrand;
