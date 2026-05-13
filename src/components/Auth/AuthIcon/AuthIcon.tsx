import { LucideIcon } from "lucide-react";
// ====================================================
function AuthIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="ring ring-gray-50/15 p-3 backdrop-blur rounded-2xl bg-white/5 sm:-mt-20 -mt-17 shadow">
      <Icon className="md:size-20 sm:size-17 size-14 text-gray-200" />
    </div>
  );
}

export default AuthIcon;
