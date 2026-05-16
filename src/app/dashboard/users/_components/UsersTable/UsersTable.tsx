"use client";
import { UserDashDbType } from "@/lib/types";
import Thead from "../Thead";
import DropDown from "./_components/DropDown";
import UserImage from "./_components/UserImage";
import UserName from "./_components/UserName";
import UserEmail from "./_components/UserEmail";
import UserDate from "./_components/UserDate";
import UserPhone from "./_components/UserPhone";
import DeleteUserButton from "./_components/DeleteUserButton";
import UserTotalSpending from "./_components/UserTotalSpending";
import TableCountCell from "./_components/TableCountCell";
import TdTable from "./_components/TdTable";
import AccountState from "./_components/AccountState";
// ========================================
function UsersTable({ users }: { users: UserDashDbType[] }) {
  return (
    <div className="overflow-x-auto w-full rounded-lg">
      <table className="bg-white/5 ring ring-gray-50/10 min-w-300 w-full">
        <Thead />
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="text-center border-b border-gray-50/5 hover:bg-black/10 mytransition"
            >
              <UserImage u={u} />
              <UserName name={u.name} />
              <UserEmail email={u.email} />
              <DropDown u={u} />
              <UserDate date={u.createdAt} />
              <DeleteUserButton />
              <UserPhone phone={u.phone} />
              <UserTotalSpending u={u} />
              <AccountState u={u} />
              <TableCountCell value={u._count.orders} />
              <TableCountCell value={u.userProducts.length} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
