import { UserDashDbType } from "@/lib/types";
// ==================================================================
function UserOrdersCount({u}:{u:UserDashDbType}) {
  return (
    <td>
      <span className="flex items-center justify-center bg-gray-400/30 rounded-sm text-gray-200 font-mono ring ring-gray-300/40 w-8 mx-auto">
        {u._count.orders}
      </span>
    </td>
  );
}

export default UserOrdersCount;
