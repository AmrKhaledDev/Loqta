import React from "react";
import Sidebar from "./_components/Sidebar/Sidebar";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { redirect } from "next/navigation";
// =======================================================
async function layout({ children }: { children: React.ReactNode }) {
  const userSession = await GetUserSession();
  if (!userSession) return redirect("/login");
  return (
    <div className="flex">
      <Sidebar userSession={userSession} />
      <main className="lg:p-10 p-2 lg:mt-0 mt-15 flex-1 min-w-0 mycontainer text-white">
        {children}
      </main>
    </div>
  );
}

export default layout;
