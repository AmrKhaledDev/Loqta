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
    <ul className="flex items-center gap-2 justify-center">
      {OrdersStatuses.map((tab) => {
        return (
          <li key={tab}>
            <button
              onClick={() => {
                setActiveTab(tab)
                setValueSearch("")
              }}
              disabled={activeTab === tab}
              className={`ring  py-3 w-30 mytransition font-semibold text-xs rounded-full  shadow 
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
