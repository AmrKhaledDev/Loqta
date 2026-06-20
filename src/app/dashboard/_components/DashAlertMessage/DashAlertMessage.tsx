import { OctagonX, SquareCheckBig } from "lucide-react";
// ====================================================
function DashAlertMessage({
  type,
  message,
}: {
  type: "error" | "success";
  message: string;
}) {
  const bgColor = type === "error" ? "bg-red-400" : "bg-green-400";
  return (
    <p className={`sm:p-3 p-2 sm:text-[15px] text-xs rounded flex items-center gap-2 ${bgColor}`}>
      {type === "error" ? (
        <OctagonX className="sm:size-5.5 size-4" />
      ) : (
        <SquareCheckBig className="sm:size-5.5 size-4" />
      )}
      {message}
    </p>
  );
}

export default DashAlertMessage;
