"use client";
import { Image as Image2 } from "lucide-react";
import ProductModalFormField from "../ProductModalFormField";
import SwitchField from "./_components/SwitchField";
// =================================================================
function BrandInfo() {
  return (
    <div className="flex flex-col gap-3 my-2">
      <h2 className="font-bold text-xl mb-3">معلومات عن الشركة المصنعة</h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-5">
          <h2>لوجو الشركة المصنعة ( اختياري )</h2>
          <SwitchField />
        </div>
        <div className="w-40 h-20 flex items-center overflow-hidden justify-center ring ring-gray-50/30 shadow rounded-md bg-white/10">
          <label
            htmlFor="brandLogoFile"
            className="p-2 rounded-full bg-white/20 ring shadow-2xl cursor-pointer hover:scale-105 mytransition active:scale-95"
          >
            <Image2 className="size-3" />
          </label>

          <input type="file" id="brandLogoFile" hidden className="hidden" />
        </div>
      </div>
      <ProductModalFormField
        id="brandWebsite"
        label="رابط الشركة المصنعة ( اختياري )"
        placeholder="أدخل رابط الشركة المصنعة"
        type="text"
        typeField="input"
      />
    </div>
  );
}

export default BrandInfo;
