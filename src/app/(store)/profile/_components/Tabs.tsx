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
    <div className="flex items-center gap-5">
      {tabs.map((t) => (
        <button
          onClick={() => setActiveTab(t.id)}
          className={`text-white py-3 font-bold px-9 mytransition rounded-md shadow  
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
