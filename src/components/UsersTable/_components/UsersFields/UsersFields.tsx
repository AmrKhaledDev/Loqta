import { UserDashDbType } from "@/lib/types/types";
import UserTotalSpending from "./_components/UserTotalSpending";
import TableCountCell from "./_components/TableCountCell";
// ==============================================================
function UsersFields({ user }: { user: UserDashDbType }) {
  return (
    <>
      <UserTotalSpending u={user} />
      <TableCountCell value={user._count.orders} />
      <TableCountCell value={user.userProducts.length} />
    </>
  );
}

export default UsersFields;
