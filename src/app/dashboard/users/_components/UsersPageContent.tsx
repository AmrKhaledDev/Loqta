"use client";
import {useState } from "react";
import SearchBar from "../../_components/SearchBar/SearchBar";
import { UserDashDbType } from "@/lib/types";
import UsersTable from "./UsersTable/UsersTable";
// ================================================================
function UsersPageContent({ users }: { users: UserDashDbType[] }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <h2 className="font-black text-3xl">إدارة المستخدمين</h2>
      <SearchBar value={value} setValue={setValue} error={error} />
      <UsersTable users={users} />
    </>
  );
}

export default UsersPageContent;
