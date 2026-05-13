"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// =======================================================
function ModalHead({
  actionType,
  setActionType
}: {
  actionType:"edit" | "create" | null;
  setActionType: Dispatch<SetStateAction<"create" | "edit" | null>>;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-bold text-xl">
        {actionType === "edit" ? "تعديل المنتج" : "إنشاء منتج"}
      </h2>
      <button
        onClick={() => setActionType(null)}
        className="cursor-pointer p-2 bg-white/10 hover:bg-white/20 mytransition rounded-full"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}

export default ModalHead;
