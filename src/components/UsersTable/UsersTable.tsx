"use client";
import { UserDashDbType } from "@/lib/types/types";
import { useState } from "react";
import UserImage from "./_components/UserImage";
import UserName from "./_components/UserName";
import UserEmail from "./_components/UserEmail";
import DropDown from "./_components/DropDown";
import UserDate from "./_components/UserDate";
import DeleteUserButton from "./_components/DeleteUserButton";
import UserPhone from "./_components/UserPhone";
import AccountState from "./_components/AccountState";
import Thead from "./_components/Thead";
import UsersFields from "./_components/UsersFields/UsersFields";
import { User } from "@prisma/client";
// ========================================
function UsersTable({
  users,
  usersType,
}: {
  users: UserDashDbType[] | User[];
  usersType: "ADMINS" | "USERS";
}) {
  const [dropDown, setDropDown] = useState("");
  return (
    <div className="overflow-x-auto min-w-300 rounded-lg">
      <table className="bg-white/5 ring ring-gray-50/10  w-full">
        <Thead usersType={usersType} />
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="text-center border-b border-gray-50/5 hover:bg-black/10 mytransition"
            >
              <UserImage u={u} />
              <UserName name={u.name} />
              <UserEmail email={u.email} />
              <DropDown u={u} dropDown={dropDown} setDropDown={setDropDown} />
              <UserDate date={u.createdAt} />
              <DeleteUserButton userId={u.id} />
              <UserPhone phone={u.phone} />
              <AccountState u={u} />
              {usersType === "USERS" && (
                <UsersFields user={u as UserDashDbType} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
