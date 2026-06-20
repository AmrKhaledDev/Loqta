"use client";
import { useEffect, useState } from "react";
import SearchBar from "../../_components/SearchBar/SearchBar";
import { UserDashDbType } from "@/lib/types/types";
import UsersTable from "../../../../components/UsersTable/UsersTable";
import axios from "axios";
// ================================================================
function UsersPageContent({ users: usersProps }: { users: UserDashDbType[] }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<UserDashDbType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const FETCH_DATA = async () => {
      try {
        if (!value.trim()) return;
        setLoading(true);
        const res = await axios(
          `/api/search-users?q=${encodeURIComponent(value)}`,
        );
        const data: UserDashDbType[] | { error: string } = res.data;
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
  const users = value && result ? result : usersProps;
  return (
    <>
      <h2 className="dashSectionsHead">إدارة المستخدمين</h2>
      <SearchBar
        placeholder="ابحث بالإيميل أو الإسم"
        value={value}
        setValue={setValue}
        error={error}
      />
      {users.length > 0 && <UsersTable users={users} usersType="USERS" />}
    </>
  );
}

export default UsersPageContent;
