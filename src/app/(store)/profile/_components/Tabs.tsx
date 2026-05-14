"use client";

import { Dispatch, SetStateAction } from "react";
// =========================================================
function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const tabs = [
    { id: "purchased", label: "مشترياتي" },
    { id: "ordered", label: "طلباتي" },
    { id: "cart", label: "في العربة" },
    { id: "settings", label: "الإعدادات" },
  ];
  return (
    <div className="flex items-center sm:gap-5 gap-3 sm:flex-nowrap flex-wrap justify-center">
      {tabs.map((t) => (
        <button
          onClick={() => setActiveTab(t.id)}
          className={`text-white md:text-[15px] sm:text-sm text-xs sm:py-3 py-2 font-bold sm:px-9 px-6 mytransition rounded-md shadow  
            ${
              activeTab === t.id
                ? "ring-transparent bg-cyan-500 scale-110 cursor-default"
                : " bg-white/10 ring ring-gray-50/20 cursor-pointer active:scale-95 hover:scale-103 "
            } `}
          key={t.id}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
