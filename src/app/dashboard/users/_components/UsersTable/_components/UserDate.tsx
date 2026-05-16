import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
// ==============================================
function UserDate({ date }: { date: Date }) {
  return (
    <td className=" text-gray-300 font-mono">
      <div className="flex items-center gap-2 justify-center">
        {dayjs(date).format("D/M/YYYY")}
        <CalendarDays className="size-5 pb-px" />
      </div>
    </td>
  );
}

export default UserDate;
