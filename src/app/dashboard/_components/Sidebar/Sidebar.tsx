"use client";
import SidebarHead from "./_components/SidebarHead";
import SidebarFooter from "./_components/SidebarFooter";
import Hr from "./_components/Hr";
import Tabs from "./_components/Tabs";
import { User } from "@prisma/client";
import { SquareMenu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// =================================
function Sidebar({ userSession }: { userSession: User }) {
  const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonShowSideBar, .sideBar"))
          setShowSideBar(false);
      }
    };
    document.addEventListener("click", handleClose);
    return () => removeEventListener("click", handleClose);
  });
  const pathname = usePathname();
  useEffect(() => {
    if (showSideBar) setShowSideBar(false);
  }, [pathname]);
  return (
    <div>
      <button
        onClick={() => setShowSideBar(true)}
        className="lg:hidden z-100 buttonShowSideBar hover:scale-102 active:scale-95 fixed top-2 right-2 text-white p-2 bgg-ip cursor-pointer rounded-full shadow"
      >
        <SquareMenu />
      </button>
      <div
        className={`lg:p-5 p-3 mytransition sideBar text-white shrink-0 z-50 ring lg:right-0  backdrop-blur-2xl ring-gray-50/20 bg-white/5 flex flex-col gap-3 justify-between lg:w-70 w-60 h-screen lg:sticky fixed top-0
        ${showSideBar ? "right-0" : "-right-100"}
        `}
      >
        <SidebarHead />
        <Hr />
        <Tabs userSession={userSession} />
        <Hr />
        <SidebarFooter userSession={userSession} />
      </div>
    </div>
  );
}

export default Sidebar;
