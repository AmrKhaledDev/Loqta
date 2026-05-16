import TdTable from "./TdTable";
// =================================================
function DeleteUserButton() {
  return (
    <TdTable>
      <button className="bg-red-950/80 hover:scale-103 active:scale-95 mytransition hover:bg-red-950/50 hover:shadow-2xl hover:ring-red-900/40 text-red-300 text-sm ring ring-red-900/50 py-1 px-3 rounded-lg">
        حذف
      </button>
    </TdTable>
  );
}

export default DeleteUserButton;
