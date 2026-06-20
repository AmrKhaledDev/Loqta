import Image from "next/image";
import TdTable from "../../TdTable/TdTable";
import { User } from "@prisma/client";
// ================================================
function UserImage({ u }: { u: User }) {
  return (
    <TdTable>
      {u.image ? (
        <Image
          src={u.image}
          alt="user-image"
          width={50}
          height={50}
          className="lg:size-12 size-10 rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="lg:size-10 size-8 lg:text-sm text-xs mx-auto bg-white/10 rounded-full ring ring-gray-50/20 capitalize text-[17px] font-bold flex flex-col justify-center">
          {u.name.slice(0, 1)}
        </div>
      )}
    </TdTable>
  );
}

export default UserImage;
