import { ProductDbType } from "@/lib/types";
import { Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// ============================================
function ProductBrand({ product }: { product: ProductDbType }) {
  return (
    <div className="flex flex-col gap-1">
      {product.brandLogo && product.brandWebsite && (
        <>
          <Image
            src="/test-brand-logo.png"
            alt="brand logo"
            width={130}
            height={130}
          />
          <Link
            target="_blank"
            className="text-blue-300 text-xs hover:underline font-semibold flex items-center gap-1"
            href={product.brandWebsite}
          >
            <Link2 className="size-5" />
            زيارة الموقع الرسمي للعلامة التجارية
          </Link>
        </>
      )}
    </div>
  );
}

export default ProductBrand;
