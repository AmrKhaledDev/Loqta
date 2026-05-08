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
    <p className={`p-3  rounded flex items-center gap-2 ${bgColor}`}>
      {type === "error" ? (
        <OctagonX className="size-5.5" />
      ) : (
        <SquareCheckBig className="size-5.5" />
      )}{" "}
      {message}
    </p>
  );
}

export default DashAlertMessage;
