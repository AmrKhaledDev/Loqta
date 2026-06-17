"use client";
import DashAlertMessage from "@/app/dashboard/_components/DashAlertMessage/DashAlertMessage";
import { CreateProductFieldsType } from "@/lib/types/ProductModalTypes/CreateProductFieldsType";
import { Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Control, Path, useWatch } from "react-hook-form";
// ============================================================
function ImageField({
  fieldNameFile,
  fieldNamePrev,
  type,
  register,
  control,
  setValue,
  error,
}: {
  fieldNameFile: Path<CreateProductFieldsType>;
  fieldNamePrev: Path<CreateProductFieldsType>;
  type: "primary" | "secondary";
  register: any;
  control: Control<CreateProductFieldsType>;
  setValue: any;
  error?: string;
}) {
  const preview = useWatch({
    control,
    name: fieldNamePrev,
  });
  const file = useWatch({
    control,
    name: fieldNameFile,
  });
  useEffect(() => {
    const generateUrl = (file: any) => {
      if (file && file[0]) {
        if (preview) URL.revokeObjectURL(preview as string);
        setValue(fieldNamePrev, URL.createObjectURL(file[0]));
      }
    };
    generateUrl(file);
  }, [file]);

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`
      ${type === "primary" ? "w-100 h-70" : "w-40 h-30"} 
      overflow-hidden flex items-center justify-center rounded-xl bg-white/10 shadow ring ring-gray-50/30`}
      >
        {preview ? (
          <div className="w-full h-full relative bg-white">
            <Image
              src={preview as string}
              alt="product_image"
              fill
              className="object-contain"
            />
            <span className="absolute inset-0 bg-black/20" />
            <div
              className={`absolute z-30 ${type === "primary" ? "top-2 right-2 " : "top-1 right-1"}`}
            >
              <button
                type="button"
                onClick={() => {
                  setValue(fieldNamePrev, "");
                  setValue(fieldNameFile, null);
                }}
                className="cursor-pointer button p-2 rounded-full bg-red-500 shadow hover:scale-105 active:scale-95 mytransition"
              >
                <Trash2
                  className={`${type === "primary" ? "size-5 " : "size-4"}`}
                />
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={fieldNamePrev}
            className="p-2 rounded-full bg-white/20 ring ring-gray-50/40 shadow-2xl cursor-pointer hover:scale-105 mytransition active:scale-95"
          >
            <Upload className={`${type === "primary" ? "size-6" : "size-4"}`} />
          </label>
        )}

        <input
          {...register(fieldNameFile)}
          type="file"
          id={fieldNamePrev}
          hidden
          accept="image/*"
        />
      </div>
      {error && <DashAlertMessage type="error" message={error} />}
    </div>
  );
}

export default ImageField;
