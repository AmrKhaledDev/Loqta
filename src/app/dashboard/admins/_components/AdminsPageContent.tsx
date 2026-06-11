"use client";
import { User } from "@prisma/client";
import SearchBar from "../../_components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import UsersTable from "@/components/UsersTable/UsersTable";
import axios from "axios";
// ==============================================================
function AdminsPageContent({ admins: adminsProps }: { admins: User[] }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const FETCH_DATA = async () => {
      try {
        if (!value.trim()) return;
        setLoading(true);
        const res = await axios(
          `/api/search-admins?q=${encodeURIComponent(value)}`,
        );
        const data: User[] | { error: string } = res.data;
        if ("error" in data) return setError(data.error);
        setResult(data);
      } catch (error) {
        console.log(error);
        setError("حدث خطأ أثناء البحث عن مستخدمين");
      } finally {
        setLoading(false);
      }
    };
    FETCH_DATA();
  }, [value]);
  const admins = value && result ? result : adminsProps;

  return (
    <>
      <h2 className="font-black text-3xl">إدارة المسؤولين</h2>
      <SearchBar value={value} setValue={setValue} error={error} />
      {admins.length > 0 && <UsersTable users={admins} usersType="ADMINS" />}
    </>
  );
}

export default AdminsPageContent;
