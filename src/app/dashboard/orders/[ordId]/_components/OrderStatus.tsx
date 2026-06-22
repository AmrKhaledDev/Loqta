"use client";

import { OrdersStatuses } from "@/lib/data/OrderStatuses";
import { ORDER_STATUS_MAP } from "@/lib/data/OrderStatusMap";
import { OrderDbType } from "@/lib/types/types";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { EditOrderStatusAction } from "@/lib/Server_Actions/Edit/EditOrderStatus.action";
import { OrderStatus as Statuses } from "@prisma/client";
import { toast } from "react-toastify";
// ========================================================
function OrderStatus({ currentOrder }: { currentOrder: OrderDbType }) {
  const [dropDown, setDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonDropDown, .boxStatuses"))
          setDropDown(false);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  const handleChangeStatus = async (status: Statuses) => {
    setDropDown(false);
    setLoading(true);
    const result = await EditOrderStatusAction(currentOrder.id, status);
    setLoading(false);
    if (!result.success) return toast.error(result.message);
    router.refresh();
    toast.success(result.message);
  };
  return (
    <div className="flex items-center sm:gap-3 gap-1.5">
      <p className="font-normal text-gray-300 md:text-[15px] sm:text-sm text-xs">حالة الطلب :</p>
      <div className="relative">
        <button
          onClick={() => setDropDown(!dropDown)}
          className="flex buttonDropDown group items-center sm:gap-5 gap-3 ring font-semibold sm:text-sm text-xs shadow text-cyan-400 ring-gray-50/20 px-3 justify-between bg-white/10 py-2 sm:w-37 w-30 rounded-full cursor-pointer"
        >
          {ORDER_STATUS_MAP[currentOrder.status].label}
          <ChevronDown
            className={`sm:size-5 size-4 group-hover:translate-y-px block mytransition ${dropDown && "rotate-180"} mytransition`}
          />
        </button>
        {dropDown && (
          <motion.ul
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
            className="flex flex-col backdrop-blur-2xl boxStatuses gap-1 absolute ring ring-gray-50/20 bg-white/5 sm:p-3 p-1.5 w-full mt-1 rounded-2xl shadow"
          >
            {OrdersStatuses.map((status) => (
              <li key={status}>
                <button
                  onClick={() => {
                    handleChangeStatus(status);
                  }}
                  disabled={loading}
                  className={`shadow w-full py-2 font-bold sm:text-sm text-xs rounded-full mytransition
                        ${status === currentOrder.status ? "bg-cyan-600" : " not-disabled:cursor-pointer not-disabled:hover:bg-cyan-500 disabled:text-gray-400 "}
                        `}
                >
                  {ORDER_STATUS_MAP[status].label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  );
}

export default OrderStatus;
