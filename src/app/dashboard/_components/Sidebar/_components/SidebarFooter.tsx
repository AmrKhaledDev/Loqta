import { User } from "@prisma/client";
import UserBadge from "./UserBadge";
import Link from "next/link";
import { CornerDownLeft, LogOut } from "lucide-react";
// =================================================================
function SidebarFooter({userSession}:{userSession:User}) {
  return (
    <div className="flex flex-col gap-3">
      <UserBadge userSession={userSession} />
      <Link
        className="flex items-center font-bold gap-2 group text-gray-400 text-sm w-fit hover:text-white mytransition"
        href={"/"}
      >
        <CornerDownLeft
          strokeWidth={2.5}
          className="group-hover:-translate-x-1 mytransition size-5"
        />
        العودة للمتجر
      </Link>
      <button className="flex text-sm hover:scale-105 mytransition active:scale-95 hover:rotate-2 items-center w-full bg-red-500 py-2 rounded-sm shadow justify-center gap-3 font-semibold cursor-pointer">
        <LogOut className="size-5" />
        تسجيل الخروج
      </button>
    </div>
  );
}

export default SidebarFooter;
