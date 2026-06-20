import { getUsers } from "@/lib/Db/PublicCaches/getUsers";
import UsersPageContent from "./_components/UsersPageContent";
import { Metadata } from "next";
// ==============================================================
export const metadata: Metadata = {
  title: "لُقطة | إدارة المستخدمين",
};
async function Users() {
  const users = await getUsers();
  return (
    <main className="dashSectionStyle">
      <UsersPageContent users={users} />
    </main>
  );
}

export default Users;
