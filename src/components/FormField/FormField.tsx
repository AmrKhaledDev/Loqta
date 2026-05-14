"use client";

import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { Dispatch, SetStateAction } from "react";

// ========================================================
function FormField({
  type,
  placeholder,
  value,
  onChange,
  disabled,
  error
}: {
  type: string;
  placeholder: string;
  value: string | number;
  onChange: Dispatch<SetStateAction<string>>;
  disabled: boolean;
  error?:string
}) {
  return (
   <div className="flex flex-col gap-1">
     <input
      onChange={(e) => onChange(e.target.value)}
      value={value}
      disabled={disabled}
      className={`border outline-none sm:text-[15px] text-sm cursor-pointer not-disabled:placeholder:text-gray-300 bg-white/5 border-gray-50/20 py-2 not-disabled:hover:bg-white/25 not-disabled:hover:border-gray-50/30 px-4 rounded-md text-white mytransition focus:border-gray-50/40 w-full disabled:text-gray-500 disabled:border-gray-50/10`}
      type={type}
      placeholder={placeholder}
    />
    {error && <AlertMessage type="error" message={error} />}
   </div>
  );
}

export default FormField;
