"use client";

import ImageField from "./ImageField";
import { Path } from "react-hook-form";
import { CreateProductFieldsType } from "@/lib/types/ProductModalTypes/CreateProductFieldsType";
import { CreateProductInputs } from "@/lib/data/CreateProductInputs";
// =================================================================
function ProductImages({
  register,
  control,
  setValue,
  error,
}: {
  register: any;
  control: any;
  setValue: any;
  error?: string;
}) {
  const secondaryImages = [
    {
      id: "image1File",
      type: "secondary",
      register: register,
      preview: "image1",
    },
    {
      id: "image2File",
      type: "secondary",
      register: register,
      preview: "image2",
    },
    {
      id: "image3File",
      type: "secondary",
      register: register,
      preview: "image3",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <ImageField
          control={control}
          fieldNameFile="primaryImageFile"
          type="primary"
          setValue={setValue}
          register={register}
          error={error}
          fieldNamePrev="primaryImage"
        />
      </div>
      <div className="flex items-center gap-2">
        {secondaryImages.map((img) => (
          <ImageField
            key={img.id}
            register={img.register}
            fieldNameFile={img.id as Path<CreateProductFieldsType>}
            type="secondary"
            control={control}
            setValue={setValue}
            fieldNamePrev={img.preview as keyof typeof CreateProductInputs}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
