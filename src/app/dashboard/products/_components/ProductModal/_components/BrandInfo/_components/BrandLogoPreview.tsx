"use client";

import { Repeat, Trash2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
// ================================================
function BrandLogoPreview({
  brandLogoPrev,
  setBrandLogoFile,
  setBrandLogoPrev,
}: {
  brandLogoPrev: string;
  setBrandLogoFile: Dispatch<SetStateAction<null | File>>;
  setBrandLogoPrev: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="relative h-full w-full bg-white">
      <Image
        src={brandLogoPrev}
        alt="brandLogo"
        fill
        className="object-contain"
      />
      <span className="absolute inset-0 block bg-black/20 z-50" />
      <div className={`absolute  z-60 flex items-center gap-1 top-1 right-1`}>
        <button
          onClick={() => {
            setBrandLogoPrev("");
            setBrandLogoFile(null);
          }}
          type="button"
          className={`bg-red-500 button shadow rounded-full cursor-pointer mytransition hover:scale-105 active:scale-95 p-1`}
        >
          <Trash2 className="size-4" />
        </button>
        <label
          htmlFor="brandLogo"
          className={`bg-green-500 button shadow rounded-full cursor-pointer mytransition hover:scale-105 active:scale-95 p-1`}
        >
          <Repeat className="size-4" />
        </label>
      </div>
    </div>
  );
}

export default BrandLogoPreview;
