import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import TdTable from "./TdTable";
// ==============================================
function UserDate({ date }: { date: Date }) {
  return (
    <TdTable>
      <div className="flex items-center gap-2 justify-center text-gray-300 font-mono ">
        {dayjs(date).format("D/M/YYYY")}
        <CalendarDays className="size-5 pb-px" />
      </div>
    </TdTable>
  );
}

export default UserDate;
