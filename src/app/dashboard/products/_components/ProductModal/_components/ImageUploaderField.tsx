"use client"

import { Repeat, Trash2 } from "lucide-react";
// ==============================================
function ImageUploaderField({
  id,
  type,
}: {
  id: string;
  type: "primary" | "secondary";
}) {
  return (
    <div className="relative w-full h-full bg-white">
      {/* <Image src={valuePrev} alt="image" fill className="object-contain" /> */}
      <span className="absolute inset-0 block bg-black/20 z-50" />
      <div
        className={`absolute  z-60 flex items-center gap-3
            ${type === "primary" ? "top-3 right-3" : "top-1 right-1"}
            `}
      >
        <button
          type="button"
         
          className={`bg-red-500 button shadow rounded-full cursor-pointer mytransition hover:scale-105 active:scale-95
                ${type === "primary" ? "p-2 " : "p-1"} 
                `}
        >
          <Trash2 className={`${type === "primary" ? "size-5" : "size-4"}`} />
        </button>
        <label
          htmlFor={id}
          className={`bg-green-500 button shadow rounded-full cursor-pointer mytransition hover:scale-105 active:scale-95
                ${type === "primary" ? "p-2 " : "p-1"} 
                `}
        >
          <Repeat className={`${type === "primary" ? "size-5" : "size-4"}`} />
        </label>
      </div>
    </div>
  );
}

export default ImageUploaderField;
