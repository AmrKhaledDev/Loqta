"use client";

import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { EGYPT_GOVERNORATES } from "@/lib/data/egypt-covernorates";
import { ChevronDown } from "lucide-react";
import {useEffect, useState } from "react";
// =======================================================
function SelectCity({
  value,
  error,
  disabled,
  setValue,
}: {
  value: string;
  error?: string;
  disabled?: boolean;
  setValue: any
}) {
  const egypt_covernorates = EGYPT_GOVERNORATES;
  const [dropDown, setDropDown] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".dropDown, .buttonShowDropDown"))
          setDropDown(false);
      }
    };
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);
  return (
    <div className="w-full relative">
      <button
        disabled={disabled}
        type="button"
        onClick={() => setDropDown(!dropDown)}
        className={`flex mb-1 group ${value ? "text-white" : "text-gray-300 "} disabled:text-gray-600 buttonShowDropDown not-disabled:hover:bg-white/25 not-disabled:hover:border-gray-50/30 items-center justify-between border bg-white/5 border-gray-50/20 disabled:border-gray-50/10 py-2 px-3 w-full rounded-md outline-none focus:border-gray-50/30 not-disabled:cursor-pointer mytransition sm:text-[15px] text-sm`}
      >
        {value ? value : "المدينة"}
        <ChevronDown
          className={`text-gray-200 ${dropDown && "rotate-180"} mytransition group-disabled:text-gray-600 sm:size-6 size-5`}
        />
      </button>
      {error && <AlertMessage type="error" message={error} />}
      {dropDown && (
        <div
          className={`flex flex-col dropDown gap-2 p-2 mt-2 max-h-60 mytransition overflow-y-auto w-full backdrop-blur-2xl ring ring-gray-50/20 rounded-xl`}
        >
          {egypt_covernorates.map((c) => (
            <button
              type="button"
              onClick={() => {
                setValue("city",c.name_ar);
                setDropDown(false);
              }}
              key={c.id}
              className={`hover:bgg-ip text-sm mytransition bg-white/5 ring ring-gray-50/20 shadow py-2 rounded-md cursor-pointer ${value === c.name_ar && "bgg-ip"}`}
            >
              {c.name_ar}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectCity;
