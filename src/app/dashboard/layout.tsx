import React from "react";
import Sidebar from "./_components/Sidebar/Sidebar";
// =======================================================
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}

export default layout;
