"use client";
import { User } from "@prisma/client";
import { User2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ButtonSignOut from "./ButtonSignOut";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
// =========================================
function UserMenu({ userSession }: { userSession: User }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonOpenMenu, .boxMenu"))
          setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handle);
    return () => {
      removeEventListener("click", handle);
    };
  }, []);
  const [errorInSignOut, setErrorInSignOut] = useState("");

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`bg-white/5 ring buttonOpenMenu  ring-gray-50/20 rounded-full sm:p-2 p-1.5 cursor-pointer hover:bg-white/15 mytransition hover:scale-105 hover:shadow-xl ${isMenuOpen && "shadow-xl shadow-gray-50/20 bg-white/15 "}`}
      >
        <User2 className="sm:size-5 size-4" />
      </button>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute flex flex-col boxMenu backdrop-blur-2xl gap-3 p-4 text-nowrap ring ring-gray-50/20 bg-white/10 shadow-xl rounded-2xl sm:w-60 w-50 mt-2 left-0 text-white"
        >
          {errorInSignOut && (
            <AlertMessage type="error" message={errorInSignOut} />
          )}
          <div className="flex items-center gap-2">
            {userSession.image ? (
              <Image
                src={userSession.image}
                alt="image"
                width={50}
                height={50}
                className="rounded-full shrink-0 sm:size-10 size-8 object-cover"
              />
            ) : (
              <div className="sm:size-10 size-8 rounded-full capitalize flex items-center justify-center ring ring-gray-50/30 bg-white/10 font-bold sm:text-xl">
                {userSession.name.slice(0, 1)}
              </div>
            )}
            <div>
              <h2 className="sm:text-sm text-xs font-semibold">
                {userSession.name}
              </h2>
              <p className="sm:text-xs text-[11px] font-normal text-gray-200">
                {userSession.email}
              </p>
            </div>
          </div>
          <span className="bg-white/20 block w-full h-px rounded" />
          <div className="flex flex-col text-sm gap-2">
            <Link
              href="/profile"
              className="bg-black/20 sm:text-[15px] text-xs text-center hover:bg-black/40 mytransition rounded-md py-2 text-white shadow"
            >
              الملف الشخصي
            </Link>
            <ButtonSignOut
              setErrorInSignOut={setErrorInSignOut}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default UserMenu;
