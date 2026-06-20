"use client"
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import DashAlertMessage from "../DashAlertMessage/DashAlertMessage";
// =====================================
function SearchBar({
  value,
  setValue,
  error,
  placeholder,
  type
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: string;
  placeholder?: string;
  type?:"number" | "text" 
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="lg:h-13 h-11 rounded-full focus-within:ring-gray-50/30 mytransition focus-within:bg-white/10  overflow-hidden bg-white/5 ring ring-gray-50/15 flex items-center gap-3 shadow">
        <button disabled={true} className="pr-4 text-gray-400">
          <Search className="lg:size-6 size-5" />
        </button>
        <span className="h-6 w-px block bg-white/10 rounded-full" />
        <div className="flex-1">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={type || "text"}
            className="h-full w-full outline-none lg:text-xl placeholder:text-gray-400 cursor-pointer"
            placeholder={placeholder || "عن ماذا تبحث ؟"}
          />
        </div>
      </div>
      {error && <DashAlertMessage type="error" message={error} />}
    </div>
  );
}

export default SearchBar;
