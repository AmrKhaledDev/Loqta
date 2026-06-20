"use client";

import { OrdersStatuses } from "@/lib/data/OrderStatuses";
import { ORDER_STATUS_MAP } from "@/lib/data/OrderStatusMap";
import { Dispatch, SetStateAction } from "react";
// =================================================================
function Tabs({
  activeTab,
  setActiveTab,
  setValueSearch
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setValueSearch:Dispatch<SetStateAction<string>>
}) {
  return (
    <ul className="flex items-center sm:gap-2 gap-1 justify-center flex-wrap">
      {OrdersStatuses.map((tab) => {
        return (
          <li key={tab}>
            <button
              onClick={() => {
                setActiveTab(tab)
                setValueSearch("")
              }}
              disabled={activeTab === tab}
              className={`ring  sm:py-3 py-2 sm:w-30 w-20 mytransition font-semibold sm:text-xs text-[10px] rounded-full shadow 
                  ${tab === activeTab ? "bg-cyan-500 ring-cyan-500/20 scale-105" : "bg-white/10 ring-gray-50/20 hover:scale-102 active:scale-95 cursor-pointer"}
                  `}
            >
              {ORDER_STATUS_MAP[tab].label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Tabs;
