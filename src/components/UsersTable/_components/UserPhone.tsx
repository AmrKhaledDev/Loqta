import TdTable from "../../TdTable/TdTable";
// ===============================================
function UserPhone({ phone }: { phone: string | null | undefined }) {
  return (
    <TdTable>
      <span
        className={` bg-white/5 font-mono font-bold lg:text-sm text-xs ring ring-gray-50/10 lg:py-1.5 py-1 lg:px-4 px-3 rounded-lg ${phone ? "text-gray-200" : "text-red-500"}`}
      >
        {phone ? phone : "غير معروف"}
      </span>
    </TdTable>
  );
}

export default UserPhone;
