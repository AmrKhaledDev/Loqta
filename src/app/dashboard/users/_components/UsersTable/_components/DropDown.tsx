"use client";

import { UserDashDbType } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// =========================================================
function DropDown({ u }: { u: UserDashDbType }) {
  const selectRole = [
    { role: "USER", label: "مستخدم" },
    { role: "ADMIN", label: "مسؤول" },
    { role: "SELLER", label: "بائع" },
  ];
  const filteredSelectRole = selectRole.filter((role) => role.role !== u.role);
  const roles = {
    USER: {
      label: "مستخدم",
    },
    ADMIN: {
      label: "مسؤول",
    },
    SELLER: {
      label: "بائع",
    },
  };
  const [dropDown, setDropDown] = useState("");
  const userRole = roles[u.role];
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonSelectRole, .boxRoles")) setDropDown("");
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  return (
    <td>
      <div className="w-30 relative">
        {dropDown !== u.id && (
          <button
            onClick={() => setDropDown((prev) => (prev == u.id ? "" : u.id))}
            className="flex w-full buttonSelectRole items-center text-xs gap-4 py-1.5 text-gray-200 mx-auto px-4  justify-between rounded-lg cursor-pointer bg-white/10 ring ring-gray-50/20"
          >
            {userRole.label}
            <ChevronDown className="size-4 text-gray-300 pt-px" />
          </button>
        )}
        {dropDown === u.id && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-1 flex boxRoles flex-col gap-1.5 p-1 bg-white/10 ring ring-gray-50/20 rounded-lg backdrop-blur-2xl text-xs z-20"
          >
            {filteredSelectRole.map((role) => (
              <button
                key={role.role}
                className="cursor-pointer hover:text-cyan-400 mytransition hover:scale-105"
              >
                {role.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </td>
  );
}

export default DropDown;
