"use client";
import { Upload } from "lucide-react";
// ============================================================
function ImageField({
  id,
  type,
}: {
  id: string;
  type: "primary" | "secondary";
}) {
  return (
    <div
      key={id}
      className={`
      ${type === "primary" ? "w-100 h-70" : "w-40 h-30"} 
      overflow-hidden flex items-center justify-center rounded-xl bg-white/10 shadow ring ring-gray-50/30`}
    >
      <label
        htmlFor={id}
        className="p-2 rounded-full bg-white/20 ring ring-gray-50/40  shadow-2xl cursor-pointer hover:scale-105 mytransition active:scale-95"
      >
        <Upload className={`${type === "primary" ? "size-6" : "size-4"}`} />
      </label>
      <input type="file" id={id} hidden className="hidden" />
    </div>
  );
}

export default ImageField;
