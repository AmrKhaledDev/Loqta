"use client";

import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";
import TdTable from "../../TdTable/TdTable";
import { User } from "@prisma/client";
import { EditRoleAction } from "@/lib/Server_Actions/Edit/EditRole.action";
import { toast } from "react-toastify";
// =========================================================
function DropDown({
  u,
  dropDown,
  setDropDown,
}: {
  dropDown: string;
  u: User;
  setDropDown: Dispatch<SetStateAction<string>>;
}) {
  const selectRole = [
    { role: "USER", label: "مستخدم" },
    { role: "ADMIN", label: "مسؤول" },
  ];
  const filteredSelectRole = selectRole.filter((role) => role.role !== u.role);
  const roles = {
    USER: {
      label: "مستخدم",
    },
    ADMIN: {
      label: "مسؤول",
    },
  } ;
  const userRole = roles[u.role?.toUpperCase() as keyof typeof roles];
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonSelectRole, .boxRoles")) setDropDown("");
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  const handleEditRole = async (role: "ADMIN" | "USER" ) => {
    setDropDown("");
    const result = await EditRoleAction(role, u.id);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    toast.success(result.message, { className: "toast-font" });
  };
  return (
    <TdTable>
      <div className="w-30 relative">
        {dropDown !== u.id && (
          <button
            onClick={() => setDropDown((prev) => (prev == u.id ? "" : u.id))}
            className="flex text-cyan-400 font-bold w-full buttonSelectRole items-center lg:text-xs text-[10px] lg:gap-4 gap-3 lg:py-1.5 py-1 mx-auto px-4  justify-between rounded-lg cursor-pointer bg-white/10 ring ring-gray-50/20"
          >
            {userRole.label || "مستخدم"}
            <ChevronDown className="size-4 text-gray-300 pt-px" />
          </button>
        )}
        {dropDown === u.id && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-1 flex boxRoles flex-col gap-1.5 p-1.5 bg-white/10 ring ring-gray-50/20 rounded-lg backdrop-blur-2xl text-xs z-20"
          >
            {filteredSelectRole.map((role) => (
              <button
                onClick={() =>
                  handleEditRole(role.role as "ADMIN" | "USER" )
                }
                key={role.role}
                className="cursor-pointer hover:text-cyan-400 mytransition hover:scale-105"
              >
                {role.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </TdTable>
  );
}

export default DropDown;
