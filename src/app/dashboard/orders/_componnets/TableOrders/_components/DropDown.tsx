"use client";

import TdTable from "@/components/TdTable/TdTable";
import { OrdersStatuses } from "@/lib/data/OrderStatuses";
import { ORDER_STATUS_MAP } from "@/lib/data/OrderStatusMap";
import { EditOrderStatusAction } from "@/lib/Server_Actions/Edit/EditOrderStatus.action";
import { OrderDbType } from "@/lib/types/types";
import { OrderStatus } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// ==================================================================
function DropDown({ ord }: { ord: OrderDbType }) {
  const [loading, setLoading] = useState(false);
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
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          className={`flex outline-none items-center shadow font-semibold gap-5 lg:text-xs group text-[10px] ring ring-gray-50/20 bg-white/5 rounded-2xl cursor-pointer py-1.5 px-2
          ${ord.isCanceled ? "text-red-500 " : "text-gray-300 "}
          `}
        >
          {ORDER_STATUS_MAP[ord.status].label}
          <ChevronDown className="size-4 mytransition text-gray-300 group-data-[state=open]:rotate-180" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="flex flex-col gap-2 mt-1 z-20 bg-white/10 backdrop-blur-xl p-3 rounded-2xl shadow ring ring-gray-50/30">
          {OrdersStatuses.map((status) => (
            <DropdownMenu.Item
              key={status}
              disabled={loading || status === ord.status}
              onClick={() => handleChangeOrderState(status)}
              className="text-xs font-bold text-right text-gray-200 outline-none select-none disabled:text-gray-500 not-disabled:cursor-pointer not-disabled:hover:text-cyan-400 not-disabled:hover:scale-105 mytransition"
            >
              {ORDER_STATUS_MAP[status].label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </TdTable>
  );
}

export default DropDown;
