import { OctagonX, SquareCheckBig, TriangleAlert } from "lucide-react";
// ====================================================
function DashAlertMessage({
  type,
  message,
}: {
  type: "error" | "success" | "warn";
  message: string;
}) {
  const bgColor =
    type === "error"
      ? "bg-red-400"
      : type === "success"
        ? "bg-green-400"
        : type === "warn"
          ? "bg-amber-600"
          : "";
  const iconStyle = "sm:size-5.5 size-4";
  return (
    <p
      className={`sm:p-3 p-2 sm:text-[15px] text-xs rounded flex items-center gap-2 ${bgColor}`}
    >
      {type === "error" && <OctagonX className={`${iconStyle}`} />}
      {type === "success" && <SquareCheckBig className={`${iconStyle}`} />}
      {type === "warn" && <TriangleAlert className={`${iconStyle}`} />}
      {message}
    </p>
  );
}

export default DashAlertMessage;
