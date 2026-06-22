import { AlertCircle } from "lucide-react";
// =====================================================================
function DashWarnMessage({ message }: { message: string }) {
  return (
    <p className="text-yellow-600 flex items-center gap-2 border border-yellow-600 mx-auto font-semibold w-fit px-10 rounded-sm text-xs py-1.5 text-center">
      <AlertCircle className="size-4.5" />
      {message}
    </p>
  );
}

export default DashWarnMessage;
