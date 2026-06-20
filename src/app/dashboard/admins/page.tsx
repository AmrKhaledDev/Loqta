import { getAdmins } from "@/lib/Db/PublicCaches/getAdmins";
import AdminsPageContent from "./_components/AdminsPageContent";
import { Metadata } from "next";
// ============================================================
export const metadata:Metadata = {
  title:"لُقطة | إدارة المسؤولين",
}
async function AdminsPage() {
  const admins = await getAdmins();
  return (
    <main className="dashSectionStyle">
      <AdminsPageContent admins={admins} />
    </main>
  );
}

export default AdminsPage;
