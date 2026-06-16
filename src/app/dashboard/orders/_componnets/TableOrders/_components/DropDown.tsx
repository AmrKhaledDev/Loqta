"use client";

import TdTable from "@/components/TdTable/TdTable";
import { OrdersStatuses } from "@/lib/data/OrderStatuses";
import { ORDER_STATUS_MAP } from "@/lib/data/OrderStatusMap";
import { EditOrderStatusAction } from "@/lib/Server_Actions/Edit/EditOrderStatus.action";
import { OrderDbType } from "@/lib/types/types";
import { OrderStatus } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
// ==================================================================
function DropDown({
  ord,
  dropDown,
  setDropDown
}: {
  ord: OrderDbType;
  dropDown:string,
  setDropDown:Dispatch<SetStateAction<string>>
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonDropDown, .boxStatus")) setDropDown("");
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  const handleChangeOrderState = async (newStatus: OrderStatus) => {
    setLoading(true);
    const result = await EditOrderStatusAction(ord.id, newStatus);
    setLoading(false);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    toast.success(result.message, { className: "toast-font" });
  };
  return (
    <TdTable>
      <button
        onClick={() => setDropDown((prev) => (prev === ord.id ? "" : ord.id))}
        className={`flex buttonDropDown items-center shadow font-semibold gap-5 text-xs ring ring-gray-50/20 bg-white/5 rounded-2xl cursor-pointer py-1.5 px-2
          ${ord.isCanceled ? "text-red-500 " : "text-gray-300 "}
          `}
      >
        {ORDER_STATUS_MAP[ord.status].label}
        <ChevronDown
          className={`size-4 text-gray-300 ${dropDown === ord.id && "rotate-180"}`}
        />
      </button>
      {dropDown === ord.id && (
        <div className="flex boxStatus flex-col gap-2 mt-1 fixed bg-white/10 backdrop-blur-xl p-3 rounded-2xl shadow ring ring-gray-50/30">
          {OrdersStatuses.map((status) => (
            <button
              disabled={loading || status === ord.status}
              onClick={() => handleChangeOrderState(status)}
              key={status}
              className="text-xs font-bold disabled:text-gray-400 not-disabled:cursor-pointer not-disabled:hover:text-cyan-400 not-disabled:hover:scale-105 mytransition"
            >
              {ORDER_STATUS_MAP[status].label}
            </button>
          ))}
        </div>
      )}
    </TdTable>
  );
}

export default DropDown;
