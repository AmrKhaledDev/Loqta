"use client";
import { Eye, EyeClosed } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import AlertMessage from "../../AlertMessage/AlertMessage";
// ==========================================
interface AuthFormFieldInterface {
  placeholder: string;
  type: "password" | "email" | "text";
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
  showPassword?: boolean;
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
  error?: string;
}
function AuthFormField({
  placeholder,
  type,
  setShowPassword,
  showPassword,
  onChange,
  value,
  error,
}: AuthFormFieldInterface) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`w-full border-2 relative focus-within:border-gray-50/40 hover:border-gray-50/40 mytransition rounded-md ${error ? "border-red-500/40" : "border-gray-50/15 "}`}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="outline-none w-full py-2 px-4 cursor-pointer sm:text-[15px] text-sm"
          type={type}
          placeholder={placeholder}
        />
        {setShowPassword ? (
          showPassword ? (
            <Eye onClick={() => setShowPassword(false)} className="eyeStyle" />
          ) : (
            <EyeClosed
              onClick={() => setShowPassword(true)}
              className="eyeStyle"
            />
          )
        ) : (
          ""
        )}
      </div>
      {error && (
        <AlertMessage
          type="error"
          message={error}
        />
      )}
    </div>
  );
}

export default AuthFormField;
