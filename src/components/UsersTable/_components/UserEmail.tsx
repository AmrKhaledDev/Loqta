import TdTable from "./TdTable";
// ==================================================
function UserEmail({ email }: { email: string }) {
  return (
    <TdTable>
      <p
        dir="auto"
        className="font-normal font-mono text-sm text-gray-300 max-w-40 line-clamp-1"
      >
        {email}
      </p>
    </TdTable>
  );
}

export default UserEmail;
