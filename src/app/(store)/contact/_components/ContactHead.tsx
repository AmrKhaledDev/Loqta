import { Headset } from "lucide-react";
// ======================================
function ContactHead() {
  return (
    <div className="flex flex-col items-center gap-5">
      <Headset className="size-28 p-6 bg-white/15 ring ring-gray-50/30 shadow rounded-full" />
      <h2 className="text-center text-3xl font-extrabold flex items-center gap-2">
        تواصل معنا لحل
        <span className="bg-clip-text text-transparent bgg-ip ">مشكلتك</span>
      </h2>
    </div>
  );
}

export default ContactHead;
