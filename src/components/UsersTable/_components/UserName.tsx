import TdTable from "../../TdTable/TdTable";
// =================================================
function UserName({ name }: { name: string }) {
  return (
    <TdTable>
      <h2 dir="auto" className="capitalize max-w-40 lg:text-[15px] sm:text-sm text-xs line-clamp-1 font-semibold text-cyan-500">
        {name}
      </h2>
    </TdTable>
  );
}

export default UserName;
