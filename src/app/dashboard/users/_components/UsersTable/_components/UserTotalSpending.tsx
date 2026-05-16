import { formatCurrency } from "@/lib/formatCurrency";
import { UserDashDbType } from "@/lib/types";
// ====================================================
function UserTotalSpending({ u }: { u: UserDashDbType }) {
  const totalSpending = u.orders.reduce((acc, ord) => acc + ord.totalPrice, 0);
  return (
    <td>
      <p className="font-mono font-bold text-green-300">
        {formatCurrency.format(totalSpending)}
      </p>
    </td>
  );
}

export default UserTotalSpending;
