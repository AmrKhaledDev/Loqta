import TdTable from "./TdTable";
// ===============================================
function UserPhone({ phone }: { phone: string | null | undefined }) {
  return (
    <TdTable>
      <span
        className={` bg-white/5 font-mono font-bold text-sm  ring ring-gray-50/10 py-1.5 px-4 rounded-lg ${phone ? "text-gray-200" : "text-red-400/60"}`}
      >
        {phone ? phone : "غير معروف"}
      </span>
    </TdTable>
  );
}

export default UserPhone;
