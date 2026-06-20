import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import TdTable from "../../TdTable/TdTable";
// ==============================================
function UserDate({ date }: { date: Date }) {
  return (
    <TdTable>
      <div className="flex items-center gap-2 justify-center text-gray-300 font-mono lg:text-[15px] text-sm">
        {dayjs(date).format("D/M/YYYY")}
        <CalendarDays className="lg:size-5 size-4 pb-px" />
      </div>
    </TdTable>
  );
}

export default UserDate;
