import TdTable from "../../TdTable/TdTable";
import { User } from "@prisma/client";
// ===========================================
function AccountState({u}:{u:User}) {
  return (
    <TdTable>
      <span
        className={`${
          u.emailVerified
            ? "text-green-600 bg-green-950/40 ring-green-900/50"
            : "text-red-600 bg-red-950/40 ring-red-900/50"
        } ring py-1 px-6 rounded-lg text-sm font-bold`}
      >
        {u.emailVerified ? "مفعّل" : "غير مفعّل"}
      </span>
    </TdTable>
  );
}

export default AccountState;
