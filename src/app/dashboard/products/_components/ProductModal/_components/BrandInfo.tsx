"use client";
import { Image } from "lucide-react";
import ProductModalFormField from "./ProductModalFormField";
import { Dispatch, SetStateAction } from "react";
// =================================================================
function BrandInfo({
  isLogoLink,
  setIsLogoLink,
  logoValue,
  setLogoValue,
  websiteValue,
  setWebsiteValue,
}: {
  isLogoLink: boolean;
  setIsLogoLink: Dispatch<SetStateAction<boolean>>;
  logoValue: string;
  setLogoValue: Dispatch<SetStateAction<string>>;
  websiteValue: string;
  setWebsiteValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-3 my-2">
      <h2 className="font-bold text-xl mb-3">معلومات عن الشركة المصنعة</h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-5">
          <h2>لوجو الشركة المصنعة ( اختياري )</h2>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold">رابط</h4>
            <div
              className={`ring relative  py-2.5 w-15 rounded-full 
                   ${isLogoLink ? "bg-cyan-500" : "bg-white/10 ring-gray-50/20"}`}
            >
              <button
                type="button"
                onClick={() => setIsLogoLink(!isLogoLink)}
                className={`absolute cursor-pointer mytransition top-1/2 -translate-y-1/2 right-1 size-3 rounded-full bg-white
                      ${isLogoLink ? "-translate-x-10" : ""}
                      `}
              />
            </div>
          </div>
        </div>
        {isLogoLink ? (
          <ProductModalFormField
            id="logoLink"
            label="رابط اللوجو"
            placeholder="أدخل رابط اللوجو الخاص بالشركة"
            type="text"
            value={logoValue}
            onChange={setLogoValue}
            typeField="input"
          />
        ) : (
          <div className="w-40 h-20 flex items-center justify-center border border-cyan-400/40 shadow rounded-md bg-white/40">
            <button className="p-2 rounded-full bg-white ring ring-cyan-500 shadow-2xl cursor-pointer hover:scale-105 mytransition active:scale-95">
              <Image className="text-cyan-500 size-3" />
            </button>
          </div>
        )}
      </div>
      <ProductModalFormField
        id="brandWebsite"
        label=" رابط الشركة المصنعة ( اختياري )"
        placeholder="أدخل رابط الشركة المصنعة"
        type="text"
        typeField="input"
        value={websiteValue}
        onChange={setWebsiteValue}
      />
    </div>
  );
}

export default BrandInfo;
