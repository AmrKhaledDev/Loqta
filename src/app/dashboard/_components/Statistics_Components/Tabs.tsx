"use client";

import { Dispatch, SetStateAction } from "react";
// ======================================================================
function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const tabs = [
    { id: "overview", name: "نظرة عامة" },
    { id: "products&inventory", name: "المنتجات و المخزون" },
    { id: "users&behavior", name: "العملاء والجمهور" },
  ];
  return (
    <ul className="flex items-center justify-center gap-3 flex-wrap">
      {tabs.map((tab) => (
        <button
          onClick={() => setActiveTab(tab.id)}
          key={tab.id}
          className={`font-semibold mytransition lg:text-[17px] md:text-[15px] sm:text-sm text-xs sm:py-3 py-2 sm:px-6 px-4 shadow-xl ring ring-white/5 rounded-2xl
            ${activeTab === tab.id ? "bgg-ip scale-105 " : " hover:bgg-ip cursor-pointer hover:scale-105 bg-black/15 "}
            `}
        >
          {tab.name}
        </button>
      ))}
    </ul>
  );
}

export default Tabs;
