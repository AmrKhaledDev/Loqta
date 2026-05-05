import Image from "next/image";
// =================================
function SidebarHead() {
  return (
    <div className="flex flex-col w-full items-center">
      <Image src={"/store-logo.png"} alt="logo" width={80} height={80} />
      <h2 className="text-cyan-300 font-black">إدارة</h2>
    </div>
  );
}

export default SidebarHead;
