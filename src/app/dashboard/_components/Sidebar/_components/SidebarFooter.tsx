"use client";
import { User } from "@prisma/client";
import UserBadge from "./UserBadge";
import Link from "next/link";
import { CornerDownLeft, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
// =================================================================
function SidebarFooter({ userSession }: { userSession: User }) {
  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء تسجيل الخروج",{className:"toast-font"});
    } finally {
      setLoading(false);
    }
  };
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
      <button
        disabled={loading}
        onClick={handleSignOut}
        className="flex text-sm disabled:bg-gray-300 disabled:text-gray-500 not-disabled:hover:scale-105 mytransition not-disabled:active:scale-95 not-disabled:hover:rotate-2 items-center w-full bg-red-500 py-2 rounded-sm shadow justify-center gap-3 font-semibold not-disabled:cursor-pointer"
      >
        {loading ? (
          "جاري تسجيل الخروج . . ."
        ) : (
          <>
            تسجيل الخروج
            <LogOut className="size-5" />
          </>
        )}
      </button>
    </div>
  );
}

export default SidebarFooter;
