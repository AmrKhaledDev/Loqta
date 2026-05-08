import React from "react";
import Sidebar from "./_components/Sidebar/Sidebar";
// =======================================================
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-10 flex-1 mycontainer  text-white">{children}</main>
    </div>
  );
}

export default layout;
