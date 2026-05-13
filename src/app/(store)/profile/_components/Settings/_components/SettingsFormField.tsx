"use client";

import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { Dispatch, SetStateAction } from "react";
// ==========================================================
function SettingsFormField({
  type,
  placeholder,
  id,
  label,
  value,
  onChange,
  disbaled,
  error,
}: {
  type: string;
  placeholder: string;
  id: string;
  label: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  disbaled: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="w-fit" htmlFor="password">
        {label}
      </label>
      <div className="flex flex-col gap-1">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-50/20 p-2 rounded-md outline-none not-disabled:cursor-pointer bg-white/10 not-disabled:focus:bg-transparent mytransition not-disabled:hover:bg-transparent"
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={disbaled}
        />
        {error && <AlertMessage type="error" message={error} />}
      </div>
    </div>
  );
}

export default SettingsFormField;
