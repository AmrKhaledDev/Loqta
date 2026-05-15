"use client";

import { Dispatch, SetStateAction } from "react";
import ImageField from "./ImageField";
import DashAlertMessage from "@/app/dashboard/_components/DashAlertMessage/DashAlertMessage";
// =================================================================
function ProductImages({
  primaryImagePrev,
  setPrimaryImagePrev,
  setPrimaryImageFile,
  image1Prev,
  setImage1Prev,
  setImage1File,
  image2Prev,
  setImage2Prev,
  setImage2File,
  image3Prev,
  setImage3Prev,
  setImage3File,
  primaryImageError,
}: {
  primaryImagePrev: string;
  setPrimaryImagePrev: Dispatch<SetStateAction<string>>;
  setPrimaryImageFile: Dispatch<SetStateAction<File | null>>;
  image1Prev: string;
  setImage1Prev: Dispatch<SetStateAction<string>>;
  setImage1File: Dispatch<SetStateAction<File | null>>;
  image2Prev: string;
  setImage2Prev: Dispatch<SetStateAction<string>>;
  setImage2File: Dispatch<SetStateAction<File | null>>;
  image3Prev: string;
  setImage3Prev: Dispatch<SetStateAction<string>>;
  setImage3File: Dispatch<SetStateAction<File | null>>;
  primaryImageError?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <ImageField
          valuePrev={primaryImagePrev}
          setValuePrev={setPrimaryImagePrev}
          setValueFile={setPrimaryImageFile}
          id="primary_image"
          type="primary"
        />
        {primaryImageError && (
          <DashAlertMessage message={primaryImageError} type="error" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <ImageField
          valuePrev={image1Prev}
          setValuePrev={setImage1Prev}
          setValueFile={setImage1File}
          id="image_1"
          type="secondary"
        />
        <ImageField
          valuePrev={image2Prev}
          setValuePrev={setImage2Prev}
          setValueFile={setImage2File}
          id="image_2"
          type="secondary"
        />
        <ImageField
          valuePrev={image3Prev}
          setValuePrev={setImage3Prev}
          setValueFile={setImage3File}
          id="image_3"
          type="secondary"
        />
      </div>
    </div>
  );
}

export default ProductImages;
