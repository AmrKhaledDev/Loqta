import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { redirect } from "next/navigation";
import SidebarHead from "./_components/SidebarHead";
import SidebarFooter from "./_components/SidebarFooter";
import Hr from "./_components/Hr";
import Tabs from "./_components/Tabs";
// =================================
async function Sidebar() {
  const userSession = await GetUserSession();
  if (!userSession) return redirect("/login");
  return (
    <div className="p-5 text-white shrink-0 ring  backdrop-blur-2xl ring-gray-50/20 bg-white/5 flex flex-col gap-3 justify-between w-70 h-screen sticky top-0">
      <SidebarHead />
      <Hr />
      <Tabs userSession={userSession}/>
      <Hr />
      <SidebarFooter userSession={userSession} />
    </div>
  );
}

export default Sidebar;
