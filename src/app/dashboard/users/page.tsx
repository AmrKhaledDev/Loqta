import { getUsers } from "@/lib/Db/PublicCaches/getUsers";
import UsersPageContent from "./_components/UsersPageContent";
import { Metadata } from "next";
// ==============================================================
export const metadata: Metadata = {
  title: "لُقطة | إدارة المستخدمين",
  description:
    "إدارة حسابات العملاء والمسجلين بالمتجر متابعة بياناتهم، تتبع حالات النشاط، مع إمكانية تعديل الحسابات، تجميدها، أو مراجعة سجل تفاعلهم مع النظام.",
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
