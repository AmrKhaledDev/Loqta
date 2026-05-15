"use client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import ImageUploaderField from "./ImageUploaderField";
import { Upload } from "lucide-react";
// ============================================================
function ImageField({
  id,
  valuePrev,
  setValuePrev,
  setValueFile,
  type,
}: {
  id: string;
  valuePrev: string;
  setValuePrev: Dispatch<SetStateAction<string>>;
  setValueFile: Dispatch<SetStateAction<File | null>>;
  type: "primary" | "secondary";
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (valuePrev) URL.revokeObjectURL(valuePrev);
      const previewUrl = URL.createObjectURL(file);
      setValuePrev(previewUrl);
      setValueFile(file);
      e.target.value = "";
    }
  };
  return (
    <div
      key={id}
      className={`
      ${type === "primary" ? "w-100 h-70" : "w-40 h-30"} 
      overflow-hidden flex items-center justify-center rounded-xl bg-white/10 shadow ring ring-gray-50/30`}
    >
      {valuePrev ? (
        <ImageUploaderField
          id={id}
          valuePrev={valuePrev}
          setValuePrev={setValuePrev}
          setValueFile={setValueFile}
          type={type}
        />
      ) : (
        <label
          htmlFor={id}
          className="p-2 rounded-full bg-white/20 ring ring-gray-50/40  shadow-2xl cursor-pointer hover:scale-105 mytransition active:scale-95"
        >
          <Upload className={`${type === "primary" ? "size-6" : "size-4"}`} />
        </label>
      )}
      <input
        onChange={handleChange}
        type="file"
        id={id}
        hidden
        className="hidden"
      />
    </div>
  );
}

export default ImageField;
