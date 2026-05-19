"use client";
import { Image as Image2, Trash2 } from "lucide-react";
import ProductModalFormField from "../ProductModalFormField";
import SwitchField from "./_components/SwitchField";
import { useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import DashAlertMessage from "@/app/dashboard/_components/DashAlertMessage/DashAlertMessage";
// =================================================================
function BrandInfo({
  register,
  brandLogoIsImage,
  setValue,
  error,
  control,
}: {
  register: any;
  brandLogoIsImage: boolean;
  setValue: any;
  control: any;
  error?: string;
}) {
  const brandLogo = useWatch({
    control,
    name: "brandLogoImage",
  });
  const [preview, setPreview] = useState(brandLogo || "");
  const file = useWatch({
    control,
    name: "brandLogoFile",
  });
  useEffect(() => {
    const generateUrl = (file: any) => {
      if (file && file[0]) {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(URL.createObjectURL(file[0]));
      }
    };
    generateUrl(file);
  }, [file]);
  return (
    <div className="flex flex-col gap-3 my-2">
      <h2 className="font-bold text-xl mb-3">معلومات عن الشركة المصنعة</h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-5">
          <h2>لوجو الشركة المصنعة ( اختياري )</h2>
          <SwitchField
            brandLogoIsImage={brandLogoIsImage}
            setValue={setValue}
          />
        </div>
        {brandLogoIsImage ? (
          <div className="w-40 h-20 flex items-center overflow-hidden justify-center ring ring-gray-50/30 shadow rounded-md bg-white/10">
            {preview ? (
              <div className="w-full h-full relative bg-white">
                <Image
                  src={preview}
                  alt="logo"
                  fill
                  className="object-contain"
                />
                <span className="absolute inset-0 bg-black/20" />
                <div className="absolute z-30 top-1 right-1">
                  <button
                    type="button"
                    onClick={() => {
                      setPreview("");
                      setValue("brandLogoImage","")
                      setValue("brandLogoFile", null);
                    }}
                    className="cursor-pointer button p-1 rounded-full bg-red-500 shadow hover:scale-105 active:scale-95 mytransition"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ) : (
              <label
                htmlFor="brandLogoFile"
                className="p-2 rounded-full bg-white/20 ring shadow-2xl cursor-pointer hover:scale-105 mytransition active:scale-95"
              >
                <Image2 className="size-3" />
              </label>
            )}
            <input
              {...register("brandLogoFile")}
              type="file"
              id="brandLogoFile"
              hidden
              className="hidden"
              accept="image/*"
            />
          </div>
        ) : (
          <ProductModalFormField
            type="text"
            typeField="input"
            id="brandLogoLink"
            register={register}
            label="رابط الشعار"
            placeholder="أدخل رابط الشعار الخاص بالشركة"
          />
        )}
        {error && <DashAlertMessage type="error" message={error} />}
      </div>
      <ProductModalFormField
        id="brandWebsite"
        label="رابط الشركة المصنعة ( اختياري )"
        placeholder="أدخل رابط الشركة المصنعة"
        type="text"
        typeField="input"
        register={register}
      />
    </div>
  );
}

export default BrandInfo;
