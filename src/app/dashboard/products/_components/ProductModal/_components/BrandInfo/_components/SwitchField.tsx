"use client";

import { Dispatch, SetStateAction } from "react";
// =======================================================================
function SwitchField({
  isLogoLink,
  setIsLogoLink
}: {
  isLogoLink: boolean;
  setIsLogoLink: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center gap-2">
      <h4 className="text-sm font-bold">رابط</h4>
      <div
        className={`ring relative  py-2.5 w-15 rounded-full ${isLogoLink ? "bg-cyan-500" : "bg-white/10 ring-gray-50/20"}`}
      >
        <button
          type="button"
          onClick={() => setIsLogoLink(!isLogoLink)}
          className={`absolute cursor-pointer mytransition top-1/2 -translate-y-1/2 right-1 size-3 rounded-full bg-white ${isLogoLink ? "-translate-x-10" : ""}
                      `}
        />
      </div>
    </div>
  );
}

export default SwitchField;
