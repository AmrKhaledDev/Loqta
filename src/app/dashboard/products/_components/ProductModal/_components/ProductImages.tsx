"use client";

import { Upload } from "lucide-react";
// =================================================================
function ProductImages() {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-100 h-70 flex items-center justify-center border border-cyan-400 rounded-2xl bg-white/40">
        <button className="p-2 rounded-full bg-white ring ring-cyan-500 shadow-2xl cursor-pointer hover:scale-105 mytransition active:scale-95">
          <Upload className="text-cyan-500 size-6" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-40 h-30 flex items-center justify-center border border-cyan-400 rounded-xl bg-white/40"
            >
              <button className="p-2 rounded-full bg-white ring ring-cyan-500 shadow-2xl cursor-pointer hover:scale-105 mytransition active:scale-95">
                <Upload className="text-cyan-500 size-4" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductImages;
