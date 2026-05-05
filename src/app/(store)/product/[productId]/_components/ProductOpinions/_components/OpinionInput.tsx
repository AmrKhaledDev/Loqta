"use client";

import { Dispatch, SetStateAction } from "react";
import { Id } from "react-toastify";
// ==================================================================
function OpinionInput({
  value,
  onChange,
  disabled,
  handle,
}: {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  disabled: boolean;
  handle: () => Promise<Id | undefined>;
}) {
  return (
    <div className="flex flex-1 items-center justify-between focus-within:border-gray-50/40 mytransition border border-gray-50/20 bg-white/5 rounded-md overflow-hidden">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") handle();
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="اكتب رأيك"
        className="py-2 flex-1 px-2 outline-none text-white bg-transparent"
      />
      <button
        disabled={disabled}
        onClick={handle}
        className="ring ring-gray-50/30 disabled:text-gray-300 bg-white/5 py-2 px-6 z-15  not-disabled:cursor-pointer not-disabled:hover:bg-white/15 mytransition text-white"
      >
        {disabled ? "جاري النشر . . ." : "  نشر"}
      </button>
    </div>
  );
}

export default OpinionInput;
