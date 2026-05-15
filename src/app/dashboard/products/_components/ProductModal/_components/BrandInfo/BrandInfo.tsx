"use client";
import { Image as Image2} from "lucide-react";
import ProductModalFormField from "../ProductModalFormField";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import SwitchField from "./_components/SwitchField";
import BrandLogoPreview from "./_components/BrandLogoPreview";
// =================================================================
function BrandInfo({
  isLogoLink,
  setIsLogoLink,
  logoValue,
  setLogoValue,
  websiteValue,
  setWebsiteValue,
  brandLogoPrev,
  setBrandLogoFile,
  setBrandLogoPrev,
}: {
  isLogoLink: boolean;
  setIsLogoLink: Dispatch<SetStateAction<boolean>>;
  logoValue: string;
  setLogoValue: Dispatch<SetStateAction<string>>;
  websiteValue: string;
  setWebsiteValue: Dispatch<SetStateAction<string>>;
  brandLogoPrev: string;
  setBrandLogoFile: Dispatch<SetStateAction<null | File>>;
  setBrandLogoPrev: Dispatch<SetStateAction<string>>;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (brandLogoPrev) URL.revokeObjectURL(brandLogoPrev);
      const url = URL.createObjectURL(file);
      setBrandLogoPrev(url);
      setBrandLogoFile(file);
      e.target.value = "";
    }
  };
  return (
    <div className="flex flex-col gap-3 my-2">
      <h2 className="font-bold text-xl mb-3">معلومات عن الشركة المصنعة</h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-5">
          <h2>لوجو الشركة المصنعة ( اختياري )</h2>
          <SwitchField isLogoLink={isLogoLink} setIsLogoLink={setIsLogoLink} />
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
          <div className="w-40  h-20 flex items-center overflow-hidden justify-center ring ring-gray-50/30 shadow rounded-md bg-white/10">
            {brandLogoPrev ? (
              <BrandLogoPreview
                brandLogoPrev={brandLogoPrev}
                setBrandLogoFile={setBrandLogoFile}
                setBrandLogoPrev={setBrandLogoPrev}
              />
            ) : (
              <label
                htmlFor="brandLogo"
                className="p-2 rounded-full bg-white/20 ring  shadow-2xl cursor-pointer hover:scale-105 mytransition active:scale-95"
              >
                <Image2 className="size-3" />
              </label>
            )}
            <input
              onChange={handleChange}
              type="file"
              id="brandLogo"
              hidden
              className="hidden"
            />
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
