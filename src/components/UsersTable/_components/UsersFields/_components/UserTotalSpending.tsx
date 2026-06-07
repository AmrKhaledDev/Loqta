import { formatCurrency } from "@/lib/formatCurrency";
import { UserDashDbType } from "@/lib/types/types";
import TdUsersTable from "../../../../TdTable/TdTable";
// ====================================================
function UserTotalSpending({ u }: { u: UserDashDbType }) {
  const totalSpending = u.orders.reduce((acc, ord) => acc + ord.totalPrice, 0);
  return (
    <TdUsersTable>
      <p className="font-mono font-bold text-green-300">
        {formatCurrency.format(totalSpending)}
      </p>
    </TdUsersTable>
  );
}

export default UserTotalSpending;
