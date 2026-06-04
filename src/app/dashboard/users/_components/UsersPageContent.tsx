"use client";
import { useState } from "react";
import SearchBar from "../../_components/SearchBar/SearchBar";
import { UserDashDbType } from "@/lib/types/types";
import UsersTable from "../../../../components/UsersTable/UsersTable";
// ================================================================
function UsersPageContent({ users }: { users: UserDashDbType[] }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <h2 className="font-black text-3xl">إدارة المستخدمين</h2>
      <SearchBar value={value} setValue={setValue} error={error} />
      {users.length > 0 && <UsersTable users={users} usersType="USERS" />}
    </>
  );
}

export default UsersPageContent;
