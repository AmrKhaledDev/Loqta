"use client";

import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
// ==========================================================
function ChangePasswordFormField<T extends FieldValues>({
  placeholder,
  id,
  label,
  disbaled,
  error,
  register,
}: {
  placeholder: string;
  id: Path<T>;
  label: string;
  disbaled: boolean;
  error?: string;
  register: UseFormRegister<T>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="w-fit" htmlFor={id}>
        {label}
      </label>
      <div className="flex flex-col gap-1">
        <input
          {...register(id)}
          className="border border-gray-50/20 p-2 rounded-md outline-none not-disabled:cursor-pointer bg-white/10 not-disabled:focus:bg-transparent mytransition not-disabled:hover:bg-transparent"
          type="password"
          id={id}
          placeholder={placeholder}
          disabled={disbaled}
        />
        {error && <AlertMessage type="error" message={error} />}
      </div>
    </div>
  );
}

export default ChangePasswordFormField;
