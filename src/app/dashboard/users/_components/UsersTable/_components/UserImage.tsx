import { UserDashDbType } from "@/lib/types";
import Image from "next/image";
import TdTable from "./TdTable";
// ================================================
function UserImage({ u }: { u: UserDashDbType }) {
  return (
    <TdTable>
      {u.image ? (
        <Image
          src={u.image}
          alt="user-image"
          width={50}
          height={50}
          className="size-12 rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="size-10 text-sm mx-auto bg-white/10 rounded-full ring ring-gray-50/20 capitalize text-[17px] font-bold flex flex-col justify-center">
          {u.name.slice(0, 1)}
        </div>
      )}
    </TdTable>
  );
}

export default UserImage;
