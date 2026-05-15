"use client";

import ImageField from "./ImageField";
// =================================================================
function ProductImages() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <ImageField
          id="primary_image"
          type="primary"
        />
      </div>
      <div className="flex items-center gap-2">
        <ImageField
          id="image_1"
          type="secondary"
        />
        <ImageField
          id="image_2"
          type="secondary"
        />
        <ImageField
          id="image_3"
          type="secondary"
        />
      </div>
    </div>
  );
}

export default ProductImages;
