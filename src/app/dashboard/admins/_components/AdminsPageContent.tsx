"use client";
import { User } from "@prisma/client";
import SearchBar from "../../_components/SearchBar/SearchBar";
import { useState } from "react";
import UsersTable from "@/components/UsersTable/UsersTable";
// ==============================================================
function AdminsPageContent({ admins }: { admins: User[] }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <h2 className="font-black text-3xl">إدارة المستخدمين</h2>
      <SearchBar value={value} setValue={setValue} error={error} />
      {admins.length > 0 && <UsersTable users={admins} usersType="ADMINS" />}
    </>
  );
}

export default AdminsPageContent;
