"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
// =====================================================
function ChangePassword({
  disabled,
  setOpenChangePassword,
}: {
  disabled: boolean;
  setOpenChangePassword: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".button, .boxChangePassword"))
          setOpenChangePassword(false);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  return (
    <div>
      <div className="text-white flex items-center gap-5 py-3">
        <h2 className="sm:text-[15px] text-sm">كلمة السر : ********</h2>
        <button
          onClick={() => setOpenChangePassword(true)}
          disabled={disabled}
          className="text-white button disabled:text-gray-600 mytransition not-disabled:hover:bg-white/15 ring ring-gray-50/20 bg-white/5 sm:py-2 py-1.5 sm:px-6 px-4 sm:text-xs text-[10px] not-disabled:cursor-pointer rounded-md"
        >
          تغيير كلمة السر
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
