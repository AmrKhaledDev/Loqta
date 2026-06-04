import TdTable from "./TdTable";
// =================================================
function UserName({ name }: { name: string }) {
  return (
    <TdTable>
      <h2 dir="auto" className="capitalize max-w-40 line-clamp-1">
        {name}
      </h2>
    </TdTable>
  );
}

export default UserName;
